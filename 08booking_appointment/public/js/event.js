document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  try {
    const user = await axios.get("http://localhost:3000/users");
    console.log(user);
    if (user.data.data.length > 0) {
      user.data.data.forEach((d) => {
        addToDOM(d);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function onsubmitHandler(e) {
  e.preventDefault();
  const obj = {
    name: e.target.name.value,
    email: e.target.email.value,
    phoneNumber: e.target.phoneNumber.value,
  };
  axios
    .post("http://localhost:3000/users", obj)
    .then((res) => {
      console.log(res);
      addToDOM(res.data.data);
      e.target.reset();
    })
    .catch((err) => console.log(err));
}

function addToDOM(userData) {
  const item = document.createElement("li");
  item.textContent = `${userData.name} - ${userData.email} - ${userData.phoneNumber}`;

  const div = document.createElement("div");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteData(userData, item));
  div.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editData(userData, item));
  div.appendChild(editBtn);
  item.appendChild(div);

  document.querySelector("#items").appendChild(item);
}

function deleteData(userData, item) {
  axios
    .delete(`http://localhost:3000/users/${userData.id}`)
    .then(() => item.remove())
    .catch((err) => console.log(err));
}
