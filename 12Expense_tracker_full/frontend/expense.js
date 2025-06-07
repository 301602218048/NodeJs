const api = "http://localhost:3000/expenses";
document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  try {
    const expense = await axios.get(api);
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
    const expense = await axios.post(api, obj);
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
  } catch (error) {
    console.log(error);
  }
}
