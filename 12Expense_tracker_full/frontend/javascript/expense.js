const api = "http://localhost:3000";
const token = localStorage.getItem("token");
const premiumBtn = document.getElementById("premiumBtn");
const cashfree = Cashfree({ mode: "sandbox" });

document.addEventListener("DOMContentLoaded", initialize);

premiumBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${api}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to create payment session");

    const { paymentSessionId, orderId } = await response.json();

    const result = await cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_modal",
    });

    if (result.error) {
      console.log("Payment error or popup closed:", result.error);
    }

    if (result.paymentDetails) {
      const status = await axios.get(`${api}/pay/payment-status/${orderId}`);
      alert(`Your payment is ${status.data.orderStatus}`);

      if (status.data.orderStatus === "Success") {
        showPremiumFeatures();
        premiumBtn.disabled = true;
      }
    }
  } catch (err) {
    console.error(err);
  }
});

function parseJwt(token) {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

async function initialize() {
  try {
    const res = await axios.get(`${api}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.data.data.forEach(addToDOM);

    const user = parseJwt(token);
    if (user.premium) {
      premiumBtn.disabled = true;
      showPremiumFeatures();
    }
  } catch (err) {
    console.error(err);
  }
}

function showPremiumFeatures() {
  const div = document.createElement("div");
  div.innerHTML = `You are a premium user. <button id="leaderboard">Show Leaderboard</button><button id="download">Download</button>`;
  document.body.insertBefore(div, document.getElementById("expenses"));

  document.getElementById("leaderboard").addEventListener("click", async () => {
    try {
      const res = await axios.get(`${api}/premium/showLeaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lbList = document.getElementById("lb-list");
      const lbHeading = document.getElementById("lb-heading");

      lbList.innerHTML = "";
      lbHeading.style.display = lbList.style.display = "block";

      res.data.leaderboard.forEach((user) => addLeaderToDOM(user, lbList));

      document.getElementById("leaderboard-tabledata").style.display = "block";
      leaderboardTableData();
    } catch (err) {
      console.error(err);
    }
  });
}

function addToDOM({ id, amount, category, description }) {
  const ul = document.getElementById("expense-list");
  const li = document.createElement("li");
  li.textContent = `Rs ${amount} - ${category} - ${description}`;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => deleteData(id, li);

  li.appendChild(delBtn);
  ul.appendChild(li);
}

function addLeaderToDOM({ name, totalExpense = 0 }, ul) {
  const li = document.createElement("li");
  li.textContent = `${name} - ${totalExpense}`;
  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();
  const { amount, category, desc } = e.target;
  addData({ amount: amount.value, category: category.value, desc: desc.value });
  e.target.reset();
}

async function addData(data) {
  try {
    const res = await axios.post(`${api}/expenses`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    addToDOM(res.data.data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteData(id, item) {
  try {
    await axios.delete(`${api}/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    item.remove();
  } catch (err) {
    console.error(err);
  }
}

async function leaderboardTableData() {
  const listboard = document.getElementById("leaderboard-tabledata");
  const response = await axios.get("http://localhost:3000/expenses", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const expenses = response.data.data;
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = now.getFullYear();
  const monthName = now.toLocaleString("default", { month: "long" });

  const monthlyExpenses = expenses.filter((exp) => {
    const [year, month] = exp.createdAt.slice(0, 10).split("-");
    return month === currentMonth && +year === currentYear;
  });

  let income = 0,
    expense = 0;
  let rows = monthlyExpenses.map((exp) => {
    const date = exp.createdAt.slice(0, 10);
    const isIncome = exp.category === "salary";
    const amt = +exp.amount;
    if (isIncome) income += amt;
    else expense += amt;

    return `
      <tr class="table-item">
        <td>${date}</td>
        <td>${exp.description}</td>
        <td>${exp.category}</td>
        <td>${isIncome ? `Rs ${amt}.00` : "00.00"}</td>
        <td>${!isIncome ? `Rs ${amt}.00` : "00.00"}</td>
      </tr>
    `;
  });

  const saving = income - expense;

  const tableSection = `
    <h2>${monthName} ${currentYear}</h2>
    <table>
      <tr><th>Date</th><th>Description</th><th>Category</th><th>Income</th><th>Expenses</th></tr>
      ${rows.join("")}
      <tr><td colspan="3"></td><td><strong>Rs ${income}.00</strong></td><td><strong>Rs ${expense}.00</strong></td></tr>
      <tr><td colspan="3"></td>
          <td style="color: green">Rs ${income}.00</td>
          <td style="color: red">Rs ${expense}.00</td>
      </tr>
    </table>
    <table style="width: 80%;">
      <tr><td style="color: blue; text-align: right;">Total Saving: Rs ${saving}.00</td></tr>
    </table>
  `;

  const yearlyReport = `
    <h3>Yearly Report</h3>
    <table>
      <tr><th>Month</th><th>Income</th><th>Expense</th><th>Saving</th></tr>
      <tr>
        <td>${monthName}</td>
        <td style="color: green">Rs ${income}.00</td>
        <td style="color: red">Rs ${expense}.00</td>
        <td style="color: blue">Rs ${saving}.00</td>
      </tr>
    </table>
  `;

  const notesReport = `
    <h3>Notes Report ${currentYear}</h3>
    <table>
      <tr><th>Date</th><th>Notes</th></tr>
      <tr><td>02-04-2023</td><td>have to go to doctor</td></tr>
      <tr><td>06-04-2023</td><td>meet at sharpner</td></tr>
    </table>
  `;

  listboard.innerHTML = tableSection + yearlyReport + notesReport;
}
