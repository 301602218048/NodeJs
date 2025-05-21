function onsubmitHandler(e) {
  e.preventDefault();
  //   console.log("submit button pressed");
  const product = e.target.productName.value;
  const obj = {
    productName: product,
  };

  axios.post("http://localhost:4000" + "/api/products", obj).then((res) => {
    console.log("Result returned from Post request:", res.data.value);
  });
}
