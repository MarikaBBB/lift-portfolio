document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    function addTask(event) {
        event.preventDefault();

        // Only proceed if the task input is not empty
        if (taskInput.value.trim() === '') {
            return; // Exit the function if the task is empty
        }

        const task = document.createElement('li');
        task.classList.add('task');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        // Add an event listener to toggle the 'completed' class
        taskCheckbox.addEventListener('change', function () {
            taskContent.classList.toggle('completed', this.checked);
        });

        const taskContent = document.createElement('input');
        taskContent.type = 'text';
        taskContent.value = taskInput.value;
        taskContent.readOnly = true; // Make the text input read-only if it is not meant to be edited

        const taskDeleteButton = document.createElement('button');
        taskDeleteButton.textContent = 'x';
        taskDeleteButton.addEventListener('click', function () {
            taskList.removeChild(task);
        });

        task.appendChild(taskCheckbox);
        task.appendChild(taskContent);
        task.appendChild(taskDeleteButton);

        taskList.appendChild(task);

        taskForm.reset();
    }

    taskForm.addEventListener('submit', addTask);
});
