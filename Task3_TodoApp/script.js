let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    save();
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {

        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;
        if (!task.text.toLowerCase().includes(search)) return;

        if (task.completed) completedCount++;

        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("stats").innerText =
        `Total: ${tasks.length} | Done: ${completedCount}`;
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    save();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    save();
    displayTasks();
}

function setFilter(type) {
    filter = type;
    displayTasks();
}

// initial load
displayTasks();