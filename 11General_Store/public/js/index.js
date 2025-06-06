const api = "http://localhost:3000/stores";

document.addEventListener("DOMContentLoaded", () => {
  initialize();
});

async function initialize() {
  try {
    const item = await axios.get(api);
    console.log(item.data.data);
    if (item.data.data.length > 0) {
      item.data.data.forEach((d) => {
        addToDOM(d);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function addToDOM(item) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = `${item.itemName} | ${item.description} | Rs${item.price} | ${item.quantity}`;
  li.appendChild(span);

  const div = document.createElement("div");
  const buyOne = document.createElement("button");
  buyOne.textContent = "Buy 1";
  buyOne.addEventListener("click", () => buyItem(item, span, 1));
  div.appendChild(buyOne);

  const buy2 = document.createElement("button");
  buy2.textContent = "Buy 2";
  buy2.addEventListener("click", () => buyItem(item, span, 2));
  div.appendChild(buy2);

  const buy3 = document.createElement("button");
  buy3.textContent = "Buy 3";
  buy3.addEventListener("click", () => buyItem(item, span, 3));
  div.appendChild(buy3);

  const delete_btn = document.createElement("button");
  delete_btn.setAttribute("type", "delete");
  delete_btn.textContent = "Remove";
  delete_btn.addEventListener("click", () => deleteData(item.id, li));
  div.appendChild(delete_btn);
  li.appendChild(div);

  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    itemName: e.target.itemName.value,
    description: e.target.description.value,
    price: e.target.price.value,
    quantity: e.target.quantity.value,
  };
  addData(obj);
  e.target.reset();
}

async function addData(obj) {
  try {
    const item = await axios.post(api, obj);
    console.log(item.data.data);
    addToDOM(item.data.data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id, li) {
  try {
    const item = await axios.delete(api + `/${id}`);
    console.log(item.data);
    li.remove();
  } catch (error) {
    console.log(error);
  }
}

async function buyItem(itemData, span, num) {
  try {
    if (itemData.quantity - num >= 0) {
      const newQuantity = itemData.quantity - num;
      const newItem = { ...itemData, quantity: newQuantity };
      const item = await axios.put(api + `/${itemData.id}`, newItem);
      console.log(item.data);
      const i = item.data.data;
      itemData.quantity = i.quantity;
      span.textContent = `${i.itemName} | ${i.description} | Rs${i.price} | ${i.quantity}`;
    } else {
      alert(`Can not buy ${itemData.itemName}`);
    }
  } catch (error) {
    console.log(error);
  }
}
