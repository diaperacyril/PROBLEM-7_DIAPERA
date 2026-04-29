let plants = JSON.parse(localStorage.getItem("plants")) || [];
function saveData() {
    localStorage.setItem("plants", JSON.stringify(plants));
}