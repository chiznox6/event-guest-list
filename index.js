document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const guestList = document.getElementById("guest-list");
  const guestNameInput = document.getElementById("guest-name");
  const guestCategorySelect = document.getElementById("guest-category");

  let guestCount = 0;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (guestCount >= 10) {
      alert("Guest limit reached (10). Remove a guest to add more.");
      return;
    }

    const name = guestNameInput.value.trim();
    const category = guestCategorySelect.value;
    if (!name) return;

    const guestItem = document.createElement("li");
    const timeAdded = new Date().toLocaleTimeString();

    guestItem.innerHTML = `
      <strong>${name}</strong> 
      <span class="category-${category}">${category}</span> 
      <span class="timestamp">🕒 ${timeAdded}</span> 
      <span class="rsvp">Attending</span>
      <button class="action rsvp-btn">Toggle RSVP</button>
      <button class="action edit-btn">Edit</button>
      <button class="action delete-btn">Remove</button>
    `;

    guestList.appendChild(guestItem);
    guestCount++;

    guestNameInput.value = "";

    // RSVP Toggle
    const rsvpBtn = guestItem.querySelector(".rsvp-btn");
    const rsvpSpan = guestItem.querySelector(".rsvp");
    rsvpBtn.addEventListener("click", () => {
      if (rsvpSpan.textContent === "Attending") {
        rsvpSpan.textContent = "Not Attending";
        rsvpSpan.classList.add("not-attending");
      } else {
        rsvpSpan.textContent = "Attending";
        rsvpSpan.classList.remove("not-attending");
      }
    });

    // Edit Name
    const editBtn = guestItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      const newName = prompt("Enter new guest name:");
      if (newName) {
        guestItem.querySelector("strong").textContent = newName;
      }
    });

    // Delete Guest
    const deleteBtn = guestItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      guestItem.remove();
      guestCount--;
    });
  });
});
