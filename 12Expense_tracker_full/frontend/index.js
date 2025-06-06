const api = "http://localhost:3000/user/signup";

function handleForm(e) {
  e.preventDefault();
  const obj = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  addData(obj);
  e.target.reset();
}

async function addData(obj) {
  try {
    const user = await axios.post(api, obj);
    console.log(user.data.data);
  } catch (error) {
    console.log(error);
    updateDOM(error.response);
  }
}

function updateDOM(user) {
  const msg = document.getElementById("message");
  const para = document.createElement("p");
  para.textContent = `Error: ${user.data.msg}`;
  para.style.color = "red";
  msg.appendChild(para);
}
