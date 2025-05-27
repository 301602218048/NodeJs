document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  try {
    const expense = await axios.get("http://localhost:3000/expenses");
    console.log(expense.data.data);
    if (expense.data.data.length > 0) {
      expense.data.data.forEach((d) => {
        addToDOM(d);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function addToDOM(expense) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.setAttribute("expense-id", expense.id);
  li.textContent =
    "Rs " +
    expense.amount +
    " - " +
    expense.category +
    " - " +
    expense.description;
  const div = document.createElement("div");

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => deleteData(expense.id, li));
  div.appendChild(delete_btn);

  const edit_btn = document.createElement("button");
  edit_btn.textContent = "Edit";
  edit_btn.addEventListener("click", () => editData(expense.id));
  div.appendChild(edit_btn);

  li.appendChild(div);
  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    amount: e.target.amount.value,
    category: e.target.category.value,
    desc: e.target.desc.value,
  };

  const editId = sessionStorage.getItem("expense-id");
  if (editId) {
    update(editId, obj);
  } else {
    addData(obj);
  }
  e.target.reset();
}

async function addData(obj) {
  try {
    const expense = await axios.post("http://localhost:3000/expenses", obj);
    console.log(expense.data.data);
    addToDOM(expense.data.data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id, item) {
  try {
    const expense = await axios.delete(`http://localhost:3000/expenses/${id}`);
    console.log(expense.data);
    item.remove();
    if (sessionStorage.getItem("expense-id"))
      sessionStorage.removeItem("expense-id");
  } catch (error) {
    console.log(error);
  }
}

async function editData(expenseId) {
  try {
    const expense = await axios.get(
      `http://localhost:3000/expenses/${expenseId}`
    );
    if (expense.data.data) {
      const form = document.querySelector("form");
      form.amount.value = expense.data.data.amount;
      form.category.value = expense.data.data.category;
      form.desc.value = expense.data.data.description;
      sessionStorage.setItem("expense-id", expenseId);
    }
  } catch (error) {
    console.log(error);
  }
}

async function update(expenseId, obj) {
  try {
    const expense = await axios.put(
      `http://localhost:3000/expenses/${expenseId}`,
      obj
    );
    console.log(expense);
    const expenseData = expense.data.data;
    if (expenseData) {
      sessionStorage.removeItem("expense-id");

      const liAll = document.querySelectorAll("li");
      liAll.forEach((li) => {
        const Id = li.getAttribute("expense-id");
        if (Id === expenseId) {
          li.firstChild.textContent =
            "Rs " +
            expenseData.amount +
            " - " +
            expenseData.category +
            " - " +
            expenseData.description;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
