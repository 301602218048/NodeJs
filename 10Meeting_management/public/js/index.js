document.addEventListener("DOMContentLoaded", () => {
  initialize();
  setupSlotClickEvents();
});

function setupSlotClickEvents() {
  const slots = document.querySelectorAll(".slot");
  const form = document.getElementById("bookingForm");

  slots.forEach((slot) => {
    slot.addEventListener("click", () => {
      const span = slot.querySelector(".available");
      let available = parseInt(span.textContent);
      if (available > 0) {
        form.style.display = "block";
        form.dataset.time = slot.dataset.time;
      } else {
        alert("No slots available at this time.");
      }
    });
  });
}

async function initialize() {
  try {
    const meeting = await axios.get("http://localhost:3000/meetings");
    console.log(meeting.data.data);
    if (meeting.data.data.length > 0) {
      meeting.data.data.forEach((d) => {
        addToDOM(d);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function addToDOM(meeting) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = `
          <p>Hi ${meeting.name},</p>
          <p>Please join the meeting via this 
          <a href="${meeting.link}" target="_blank">link</a> 
          at ${meeting.time} PM.</p>
        `;

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Cancel";
  delete_btn.addEventListener("click", () => deleteData(meeting.id, li));
  li.appendChild(delete_btn);

  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    name: e.target.name.value,
    email: e.target.email.value,
    time: e.target.dataset.time,
  };
  addData(obj);
  e.target.reset();
  e.target.style.display = "none";
}

async function addData(obj) {
  try {
    const meeting = await axios.post("http://localhost:3000/meetings", obj);
    console.log(meeting.data.data);
    addToDOM(meeting.data.data);

    const slot = document.querySelector(`[data-time="${obj.time}"]`);
    const availableSpan = slot.querySelector(".available");
    let available = parseInt(availableSpan.textContent);
    if (available > 0) {
      availableSpan.textContent = available - 1;
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id, item) {
  try {
    const meeting = await axios.delete(`http://localhost:3000/meetings/${id}`);
    console.log(meeting.data);

    const time = meeting.data.data.time;

    const slot = document.querySelector(`[data-time="${time}"]`);
    const availableSpan = slot.querySelector(".available");
    let available = parseInt(availableSpan.textContent);
    if (available < 2) {
      availableSpan.textContent = available + 1;
    }
    item.remove();
  } catch (error) {
    console.log(error);
  }
}
