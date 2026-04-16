let data = JSON.parse(localStorage.getItem("h")) || [];

function save() {
    localStorage.setItem("h", JSON.stringify(data));
}

function add() {
    let input = document.getElementById("input");

    if (!input.value) return;

    data.push(input.value);
    input.value = "";

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
        <div class="item">
            ${x}
            <button onclick="del(${i})">x</button>
        </div>`;
    });
}

show();

// PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
}
