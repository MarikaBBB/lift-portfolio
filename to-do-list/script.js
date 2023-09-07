document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Function to create a new task
    function createTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task">
                <input type="checkbox" class="complete">
                <span>${taskText}</span>
            </div>
            <button class="remove">Remove</button>
        `;
        taskList.appendChild(li);

        // Add event listeners for the buttons
        const removeButton = li.querySelector(".remove");

        removeButton.addEventListener("click", () => {
            taskList.removeChild(li);
        });
    }

    // "Add" button is clicked
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTask(taskText);
            taskInput.value = "";
        }
    });

    // Task when Enter key is pressed
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTaskButton.click();
        }
    });
});
