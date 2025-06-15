const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const guestInput = document.getElementById("guest-name");
const categoryInput = document.getElementById("guest-category");

let guestCount = 0;
const maxGuests = 10;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (guestCount >= maxGuests) {
    alert("Guest limit reached (10 guests max)");
    return;
  }

  const name = guestInput.value.trim();
  const category = categoryInput.value;

  if (name === "") return;

  const listItem = document.createElement("li");
  listItem.classList.add(`category-${category}`);

  const guestInfo = document.createElement("span");
  guestInfo.textContent = `${name} (${category}) - Attending`;
  
  const timestamp = document.createElement("small");
  const timeAdded = new Date().toLocaleTimeString();
  timestamp.textContent = ` [Added at ${timeAdded}]`;

  const rsvpBtn = document.createElement("button");
  rsvpBtn.textContent = "Toggle RSVP";
  rsvpBtn.addEventListener("click", () => {
    if (guestInfo.textContent.includes("Attending")) {
      guestInfo.textContent = `${name} (${category}) - Not Attending`;
    } else {
      guestInfo.textContent = `${name} (${category}) - Attending`;
    }
    guestInfo.appendChild(timestamp);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const newName = prompt("Edit guest name:", name);
    if (newName) {
      guestInfo.textContent = `${newName} (${category}) - Attending`;
      guestInfo.appendChild(timestamp);
    }
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    guestList.removeChild(listItem);
    guestCount--;
  });

  listItem.appendChild(guestInfo);
  listItem.appendChild(timestamp);
  listItem.appendChild(rsvpBtn);
  listItem.appendChild(editBtn);
  listItem.appendChild(removeBtn);

  guestList.appendChild(listItem);

  guestInput.value = "";
  guestCount++;
});
