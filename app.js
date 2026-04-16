let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
    let input = document.getElementById("habitInput");
    if (input.value === "") return;

    habits.push({
        name: input.value,
        done: false
    });

    input.value = "";
    save();
    render();
}

function toggleHabit(index) {
    habits[index].done = !habits[index].done;
    save();
    render();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    save();
    render();
}

function render() {
    let list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((h, i) => {
        list.innerHTML += `
        <div class="habit">
            <span class="${h.done ? 'done' : ''}" onclick="toggleHabit(${i})">
                ${h.name}
            </span>
            <button onclick="deleteHabit(${i})">❌</button>
        </div>`;
    });
}

render();
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
