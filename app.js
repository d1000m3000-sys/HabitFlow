let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function addHabit() {
    let input = document.getElementById("habitInput");

    if (input.value === "") return;

    habits.push({
        name: input.value,
        dates: [],
        streak: 0
    });

    input.value = "";
    save();
    render();
}

function toggleHabit(index) {
    let today = getToday();
    let habit = habits[index];

    if (habit.dates.includes(today)) {
        habit.dates = habit.dates.filter(d => d !== today);
        habit.streak = Math.max(0, habit.streak - 1);
    } else {
        habit.dates.push(today);
        habit.streak++;
    }

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
        let doneToday = h.dates.includes(getToday());

        list.innerHTML += `
        <div class="habit">
            <div onclick="toggleHabit(${i})">
                <span class="${doneToday ? 'done' : ''}">
                    ${h.name}
                </span>
                <div style="font-size:12px;color:#aaa;">
                    🔥 ${h.streak} يوم
                </div>
            </div>

            <button onclick="deleteHabit(${i})">🗑</button>
        </div>`;
    });
}

render();

// تسجيل service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
