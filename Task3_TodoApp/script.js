let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (!text) return;

    tasks.push({
        text,
        date,
        priority,
        completed: false
    });

    save();
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("search").value.toLowerCase();
    list.innerHTML = "";

    let completed = 0;

    tasks.forEach((t, i) => {

        if (filter === "completed" && !t.completed) return;
        if (filter === "pending" && t.completed) return;
        if (!t.text.toLowerCase().includes(search)) return;

        if (t.completed) completed++;

        let li = document.createElement("li");
        li.className = t.priority.toLowerCase();

        li.innerHTML = `
            <div onclick="toggle(${i})" class="${t.completed ? 'completed' : ''}">
                ${t.text}<br>
                <small>${t.date || ""} | ${t.priority}</small>
            </div>
            <button onclick="del(${i})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("stats").innerText =
        `Total: ${tasks.length} | Done: ${completed}`;
}

function toggle(i) {
    tasks[i].completed = !tasks[i].completed;
    save();
    displayTasks();
}

function del(i) {
    tasks.splice(i, 1);
    save();
    displayTasks();
}

function setFilter(f) {
    filter = f;
    displayTasks();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

displayTasks();