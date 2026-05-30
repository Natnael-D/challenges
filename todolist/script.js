
        let tasks = [];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const saved = localStorage.getItem('tasks');
            if (saved) {
                tasks = JSON.parse(saved);
            }
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            
            if (tasks.length === 0) {
                taskList.innerHTML = '<li class="empty-message"> No tasks yet. Add one above!</li>';
                return;
            }

            taskList.innerHTML = '';
            
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'task-item';
                
                const taskText = document.createElement('span');
                taskText.className = 'task-text' + (task.completed ? ' completed' : '');
                taskText.textContent = task.text;
                taskText.onclick = () => toggleTask(index);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => deleteTask(index);
                
                li.appendChild(taskText);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }

        function addTask() {
            const input = document.getElementById('taskInput');
            const text = input.value.trim();
            
            if (text === '') {
                alert('Please enter a task!');
                return;
            }
            
            tasks.push({
                text: text,
                completed: false
            });
            
            input.value = '';
            saveTasks();
            renderTasks();
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        loadTasks();
        renderTasks();

        document.getElementById('addBtn').addEventListener('click', addTask);
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    