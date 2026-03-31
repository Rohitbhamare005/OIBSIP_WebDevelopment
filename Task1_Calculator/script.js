let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}
function toggleTheme() {
    document.body.classList.toggle("dark");
}
document.addEventListener("keydown", function(e) {
    if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        deleteLast();
    } else if (e.key === "Escape") {
        clearDisplay();
    }
});
let history = document.getElementById("history");

function calculate() {
    try {
        let result = eval(display.value);
        history.innerHTML += `<div>${display.value} = ${result}</div>`;
        display.value = result;
    } catch {
        display.value = "Error";
    }
}