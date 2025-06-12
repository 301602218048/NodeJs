const api = "http://localhost:3000";
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", initialize);

const cashfree = Cashfree({
  mode: "sandbox",
});

document.getElementById("premiumBtn").addEventListener("click", async () => {
  try {
    const response = await fetch(`${api}/pay`, {
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
        `${api}/pay/payment-status/${data.orderId}`,
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
    const expense = await axios.get(`${api}/expenses`, {
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
              `${api}/premium/showLeaderboard`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (leaderboard.data.leaderboard.length > 0) {
              let h2 = document.querySelector("h2#leaderboard-heading");
              if (!h2) {
                h2 = document.createElement("h2");
                h2.id = "leaderboard-heading";
                h2.textContent = "Current Leaderboard";
                document.body.insertBefore(h2, null);
              }

              let ul = document.querySelector("ul#leaderboard-list");
              if (!ul) {
                ul = document.createElement("ul");
                ul.id = "leaderboard-list";
                document.body.insertBefore(ul, null);
              } else {
                ul.innerHTML = "";
              }

              leaderboard.data.leaderboard.forEach((l) => {
                addLeaderToDOM(l, ul);
              });

              ul = document.createElement("ul");
              ul.id = "leaderboard-tabledata";
              document.body.insertBefore(ul, null);
              leaderboardTableData();
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
  li.textContent = u.name + " - " + (u.totalExpense || 0);
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
    const expense = await axios.post(`${api}/expenses`, obj, {
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
    const expense = await axios.delete(`${api}/expenses/${id}`, {
      headers: { Authorization: token },
    });
    console.log(expense.data);
    item.remove();
  } catch (error) {
    console.log(error);
  }
}

async function leaderboardTableData() {
  const listboard = document.getElementById("leaderboard-tabledata");
  const response = await axios.get("http://localhost:3000/expenses", {
    headers: {
      "Content-type": "application/json",
      authorization: token,
    },
  });
  let expenses = response.data.data;
  let arr = [...expenses];
  const d = Date.now();
  const now = new Date(d);
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const monthnumber = now.getMonth();
  let cmonth = String(monthnumber + 1);
  cmonth = "0" + cmonth;
  // const month = arr[0].createdAt.slice(0, 10).split("-")[1];
  arr = arr.filter(
    (expense) => expense.createdAt.slice(0, 10).split("-")[1] === cmonth
  );
  let totalIncome = 0;
  let totalExpense = 0;
  let totalSaving = 0;
  let listData = "";
  listData += `<h2>${monthName} ${year}</h2>`;
  listData += "<table>";
  listData +=
    "<tr><th>Date</th><th>Description</th><th>Category</th><th>Income</th><th>Expenses</th></tr>";
  if (arr.length < 1) {
    listData += "</table>";
    listboard.innerHTML = listData;
  } else {
    arr.map((expense) => {
      listData += '<tr class="table-item">';
      if (expense.category === "salary") {
        totalIncome += expense.amount * 1;
        listData += `<th>${expense.createdAt.slice(0, 10)}</th><th>${
          expense.description
        }</th><th>${expense.category}</th><th>${
          expense.amount
        }.00</th><th>00.00</th> `;
      } else {
        totalExpense += expense.amount * 1;
        listData += `<th>${expense.createdAt.slice(0, 10)}</th><th>${
          expense.description
        }</th><th>${expense.category}</th><th>00.00</th><th>${
          expense.amount
        }.00</th> `;
      }
      listData += "</tr>";
    });
    totalSaving = totalIncome - totalExpense;
    listData += `<tr><th></th><th></th><th></th><th>${totalIncome}.00</th><th>${totalExpense}.00</th></tr>`;
    listData += `<tr><th></th><th></th><th></th><th style= "color : green ; width:80px">Rs ${totalIncome}.00</th><th style= "color : red ; width:60px">Rs ${totalExpense}</th></tr>`;
    listData += `<table style = "width: 80%;"><tr><th style= "color : blue; text-align: right; ">Total Saving :- Rs ${totalSaving}.00</th></tr></table>`;
    listData += "</table>";
    // mothly table
    listData += "<h3>Yearly Report</h3>";
    listData += "<table>";
    listData +=
      "<tr><th>Month</th><th>Income</th><th>Expense</th><th>Saving</th></tr>";
    listData += `<tr><th>${monthName}</th><th> ${totalIncome}.00</th><th>${totalExpense}.00</th><th> ${totalSaving}.00</th></tr>`;
    listData += `<tr><th></th><th style= "color : green">Rs ${totalIncome}.00</th><th style= "color : red">Rs ${totalExpense}.00</th><th style= "color : blue">Rs ${totalSaving}.00</th></tr>`;
    listData += "</table>";
    // notes table
    listData += `<h3>Notes Report ${year}</h3>`;
    listData += "<table>";
    listData += "<tr><th>Date</th><th>Notes</th></tr>";
    listData += "<tr><th>02-04-2023</th><th>have to go to doctor</th></tr>";
    listData += "<tr><th>06-04-2023</th><th>meet at sharpner </th></tr>";
    listData += "</table>";
    listboard.innerHTML = listData;
  }
}
