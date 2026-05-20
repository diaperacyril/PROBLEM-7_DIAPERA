let plants = JSON.parse(localStorage.getItem("plants")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function saveData() {
    localStorage.setItem("plants", JSON.stringify(plants));
}

function saveHistory() {
    localStorage.setItem("history", JSON.stringify(history));
}

function addPlant() {

    const name = document.getElementById("plantName").value;
    const frequency = document.getElementById("frequency").value;

    if (!name || !frequency) {
        alert("Please fill all fields");
        return;
    }

    plants.push({
        name,
        frequency: Number(frequency),
        lastWatered: new Date().toISOString()
    });

    saveData();
    displayPlants();

    document.getElementById("plantName").value = "";
    document.getElementById("frequency").value = "";
}

function getDaysDifference(date1, date2) {
    return Math.floor((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));
}

function displayPlants() {

    const list = document.getElementById("plantList");
    list.innerHTML = "";

    plants.forEach((plant, index) => {

        const daysPassed = getDaysDifference(plant.lastWatered, new Date());
        const daysLeft = plant.frequency - daysPassed;

        const li = document.createElement("li");

        if (daysLeft < 0) {
            li.classList.add("overdue");
        }

        li.innerHTML = `
            <strong>${plant.name}</strong><br>
            ${daysLeft < 0 ? "⚠ Overdue" : daysLeft + " days left"}<br>

            <button onclick="waterPlant(${index})">💧 Water</button>
            <button onclick="deletePlant(${index})">🗑 Delete</button>
        `;

        list.appendChild(li);
    });
}

function deletePlant(index) {
    plants.splice(index, 1);
    saveData();
    displayPlants();
}

function waterPlant(index) {

    plants[index].lastWatered = new Date().toISOString();

    history.unshift({
        name: plants[index].name,
        date: new Date().toISOString()
    });

    saveData();
    saveHistory();
    displayPlants();
}

function toggleHistory() {

    const section = document.getElementById("historySection");

    if (section.style.display === "none") {
        section.style.display = "block";
        displayHistory();
    } else {
        section.style.display = "none";
    }
}

function displayHistory() {

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} watered on ${new Date(item.date).toLocaleString()}`;
        list.appendChild(li);
    });
}

displayPlants();