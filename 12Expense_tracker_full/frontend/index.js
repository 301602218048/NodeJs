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
  }
}
