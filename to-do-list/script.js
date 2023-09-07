document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Function to create a new task
    function createTask(taskText) {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            <input type="checkbox" class="complete">
            <span class="task-text">${taskText}</span>
            <input type="text" class="edit-task-input" value="${taskText}" style="display: none;">
            <button class="edit">Edit</button>
            <button class="move-up">▲</button>
            <button class="move-down">▼</button>
            <button class="remove">×</button>
        `;

        // Add event listeners for the buttons
        const removeButton = li.querySelector(".remove");
        const editButton = li.querySelector(".edit");
        const taskTextSpan = li.querySelector(".task-text");
        const editInput = li.querySelector(".edit-task-input");
        const moveUpButton = li.querySelector(".move-up");
        const moveDownButton = li.querySelector(".move-down");
        const completeCheckbox = li.querySelector(".complete");

        editButton.addEventListener("click", () => {
            taskTextSpan.style.display = "none";
            editInput.style.display = "block";
            editInput.focus();
        });

        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                taskTextSpan.style.display = "block";
                editInput.style.display = "none";
                taskTextSpan.textContent = editInput.value;
            }
        });

        removeButton.addEventListener("click", () => {
            taskList.removeChild(li);
        });

        moveUpButton.addEventListener("click", () => {
            moveTaskUp(li);
        });

        moveDownButton.addEventListener("click", () => {
            moveTaskDown(li);
        });

        completeCheckbox.addEventListener("change", () => {
            if (completeCheckbox.checked) {
                taskTextSpan.style.textDecoration = "line-through";
            } else {
                taskTextSpan.style.textDecoration = "none";
            }
        });

        taskList.appendChild(li);
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

    // Function to move task up
    function moveTaskUp(li) {
        const prevLi = li.previousElementSibling;
        if (prevLi) {
            taskList.insertBefore(li, prevLi);
        }
    }

    // Function to move task down
    function moveTaskDown(li) {
        const nextLi = li.nextElementSibling;
        if (nextLi) {
            taskList.insertBefore(nextLi, li);
        }
    }
});
