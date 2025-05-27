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
  // li.setAttribute("user-id", user.id);
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

  const amount = e.target.amount.value;
  const category = e.target.category.value;
  const desc = e.target.desc.value;

  // const editId = sessionStorage.getItem("edit-id");
  // if (editId) {
  //   update(editId, amount, category, desc);
  // } else {
  // }
  addData(amount, category, desc);
  e.target.reset();
}

async function addData(amount, category, desc) {
  try {
    const obj = {
      amount,
      category,
      desc,
    };
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
  } catch (error) {
    console.log(error);
  }
}

// function editData(userId) {
//   const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
//   const user = usersList.find((u) => u.id === userId);
//   if (user) {
//     const form = document.querySelector("form");
//     form.amount.value = user.amount;
//     form.category.value = user.category;
//     form.desc.value = user.desc;
//     sessionStorage.setItem("edit-id", userId);
//   }
// }

// function update(editId, amount, category, desc) {
//   const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
//   const newUserList = usersList.map((user) => {
//     if (user.id === editId) {
//       return { ...user, amount, category, desc };
//     } else return user;
//   });
//   localStorage.setItem("usersList", JSON.stringify(newUserList));
//   sessionStorage.removeItem("edit-id");

//   const liAll = document.querySelectorAll("li");
//   liAll.forEach((li) => {
//     const Id = li.getAttribute("user-id");
//     if (Id === editId) {
//       li.firstChild.textContent =
//         "Rs " + amount + " - " + category + " - " + desc;
//     }
//   });
// }
