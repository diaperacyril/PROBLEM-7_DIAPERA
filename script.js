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