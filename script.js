let plants = JSON.parse(localStorage.getItem("plants")) || [];

function saveData() {
    localStorage.setItem("plants", JSON.stringify(plants));
} 

function addPlant() {
    const name = document.getElementById("plantName").value;
    const frequency = document.getElementById("frequency").value;

    if (!name || !frequency) {
        alert("Please fill all fields");
        return;
    }

    const today = new Date().toISOString();

    plants.push({
        name,
        frequency: parseInt(frequency),
        lastWatered: today
    });

    saveData();
    displayPlants();

    document.getElementById("plantName").value = "";
    document.getElementById("frequency").value = "";
}

function getDaysDifference(date1, date2) {
    const diff = new Date(date2) - new Date(date1);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Calculate next watering date
function getNextWateringDate(lastWatered, frequency) {
    const date = new Date(lastWatered);
    date.setDate(date.getDate() + frequency);
    return date.toDateString();
}

function displayPlants() {
    const list = document.getElementById("plantList");
    list.innerHTML = "";

    const today = new Date();

    plants.forEach((plant, index) => {
        const daysPassed = getDaysDifference(plant.lastWatered, today);
        const daysLeft = plant.frequency - daysPassed;

        const nextDate = getNextWateringDate(plant.lastWatered, plant.frequency);

        const li = document.createElement("li");

        if (daysLeft < 0) {
            li.classList.add("overdue");
        } else if (daysLeft === 0) {
            li.classList.add("due-today");
        }

        li.innerHTML = `
            <div class="plant-header">🌿 <strong>${plant.name}</strong></div>

            ${
                daysLeft < 0 
                ? "⚠️ Overdue by " + Math.abs(daysLeft) + " days"
                : daysLeft === 0
                ? "💧 Water TODAY"
                : "Next watering in " + daysLeft + " days"
            }

            <br>

            <!-- ✅ ADDED: LAST WATERED DISPLAY -->
            <small>🕒 Last watered: ${new Date(plant.lastWatered).toDateString()}</small>

            <br>

            <small>📅 Next watering: ${nextDate}</small>

            <div class="actions">
                <button class="water-btn" onclick="waterPlant(${index})">💧 Watered</button>
                <button class="delete-btn" onclick="deletePlant(${index})">🗑 Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// delete plant
function deletePlant(index) {
    if (confirm("Delete this plant?")) {
        plants.splice(index, 1);
        saveData();
        displayPlants();
    }
}

function waterPlant(index) {
    plants[index].lastWatered = new Date().toISOString();
    saveData();
    displayPlants();
}

displayPlants();