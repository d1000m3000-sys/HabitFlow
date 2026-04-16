let data = JSON.parse(localStorage.getItem("h")) || [];

function save() {
    localStorage.setItem("h", JSON.stringify(data));
}

function add() {
    let input = document.getElementById("input");

    if (!input.value) return;

    data.push({
        name: input.value,
        done: false
    });

    input.value = "";

    save();
    show();
}

function toggle(i) {
    data[i].done = !data[i].done;
    save();
    show();
}

function del(i) {
    data.splice(i, 1);
    save();
    show();
}

function show() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((x, i) => {
        list.innerHTML += `
        <div class="item ${x.done ? 'done' : ''}">
            <div class="left">
                <span class="check" onclick="toggle(${i})">
                    ${x.done ? "✔" : "⭕"}
                </span>
                <span>${x.name}</span>
            </div>
            <button class="delete" onclick="del(${i})">🗑</button>
        </div>`;
    });
}

show();

// PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
}
