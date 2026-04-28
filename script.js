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

function displayPlants() {
    const list = document.getElementById("plantList");
    list.innerHTML = "";

    const today = new Date();

    plants.forEach((plant, index) => {
        const daysPassed = getDaysDifference(plant.lastWatered, today);
        const daysLeft = plant.frequency - daysPassed;

        const li = document.createElement("li");

        if (daysLeft < 0) {
            li.classList.add("overdue");
        } else if (daysLeft === 0) {
            li.classList.add("due-today");
        }

        li.innerHTML = `
            <strong>${plant.name}</strong><br>
            ${daysLeft < 0 
                ? "⚠️ Overdue by " + Math.abs(daysLeft) + " days"
                : daysLeft === 0
                ? "💧 Water TODAY"
                : "Next watering in " + daysLeft + " days"
            }
            <br><br>
            <button onclick="waterPlant(${index})">Watered</button>
        `;

        list.appendChild(li);
    });
}

function waterPlant(index) {
    plants[index].lastWatered = new Date().toISOString();
    saveData();
    displayPlants();
}

// Load on start
displayPlants();