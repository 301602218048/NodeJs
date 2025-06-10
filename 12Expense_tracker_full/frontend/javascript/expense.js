const api = "http://localhost:3000/expenses";
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", initialize);

const cashfree = Cashfree({
  mode: "sandbox",
});

document.getElementById("premiumBtn").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create payment session");
    }
    const data = await response.json();
    const paymentSessionId = data.paymentSessionId;

    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_modal",
    };
    const result = await cashfree.checkout(checkoutOptions);
    if (result.error) {
      // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
      console.log(
        "User has closed the popup or there is some payment error, Check for Payment Status"
      );
      console.log(result.error);
    }
    if (result.redirect) {
      // This will be true when the payment redirection page couldnt be opened in the same window
      // This is an exceptional case only when the page is opened inside an inAppBrowser
      // In this case the customer will be redirected to return url once payment is completed
      console.log("Payment will be redirected");
    }
    if (result.paymentDetails) {
      // Payment completed, now check the status from your backend
      const response = await fetch(
        `http://localhost:3000/pay/payment-status/${data.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const statusData = await response.json();
      alert("your payment is " + statusData.orderStatus);
      const div = document.createElement("div");
      div.innerHTML = `You are a premium user. <button id="leaderboard">Show Leaderboard</button>`;
      document
        .querySelector("body")
        .insertBefore(div, document.querySelector("#expenses"));
    }
  } catch (error) {
    console.log(error);
  }
});

async function initialize() {
  try {
    const expense = await axios.get(api, {
      headers: { Authorization: token },
    });
    console.log(expense.data);
    if (expense.data.data.length > 0) {
      expense.data.data.forEach((d) => {
        addToDOM(d);
      });
    }
    if (expense.data.premium) {
      const div = document.createElement("div");
      div.innerHTML = `You are a premium user. <button id="leaderboard">Show Leaderboard</button>`;
      document
        .querySelector("body")
        .insertBefore(div, document.querySelector("#expenses"));
      document
        .querySelector("#leaderboard")
        .addEventListener("click", async () => {
          try {
            const leaderboard = await axios.get(
              "http://localhost:3000/premium/showLeaderboard",
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (leaderboard.data.leaderboard.length > 0) {
              const h2 = document.createElement("h2");
              h2.textContent = "Current Leaderboard";
              document.querySelector("body").insertBefore(h2, null);

              const ul = document.createElement("ul");
              document.querySelector("body").insertBefore(ul, null);
              leaderboard.data.leaderboard.forEach((l) => {
                addLeaderToDOM(l, ul);
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
}

function addLeaderToDOM(u, ul) {
  const li = document.createElement("li");
  li.textContent = u.user.name + "-" + u.totalExpense;
  ul.appendChild(li);
}

function addToDOM(expense) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent =
    "Rs " +
    expense.amount +
    " - " +
    expense.category +
    " - " +
    expense.description;

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => deleteData(expense.id, li));

  li.appendChild(delete_btn);
  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    amount: e.target.amount.value,
    category: e.target.category.value,
    desc: e.target.desc.value,
  };

  addData(obj);
  e.target.reset();
}

async function addData(obj) {
  try {
    const expense = await axios.post(api, obj, {
      headers: { Authorization: token },
    });
    console.log(expense.data.data);
    addToDOM(expense.data.data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id, item) {
  try {
    const expense = await axios.delete(`${api}/${id}`);
    console.log(expense.data);
    item.remove();
  } catch (error) {
    console.log(error);
  }
}
