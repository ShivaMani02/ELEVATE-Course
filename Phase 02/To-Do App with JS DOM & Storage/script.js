document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elemets ===
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const tasksLeftCount = document.getElementById('tasksLeftCount');
    const filterLinks = document.querySelectorAll('.task-filters .nav-link');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const searchInput = document.getElementById('searchInput');

    // Modal Elements
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editTaskIdInput = document.getElementById('editTaskId');
    const editTaskNameInput = document.getElementById('editTaskName');
    const editDueDateInput = document.getElementById('editDueDate');
    const saveEditBtn = document.getElementById('saveEditBtn');

    // === State ===
    let tasks = [];
    let currentFilter = 'all'; // all, active, completed
    let searchQuery = '';

    // === Initialization ===
    init();

    function init() {
        // Load data from LocalStorage
        const storedTasks = localStorage.getItem('elevateTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }

        // Load theme from LocalStorage
        const storedTheme = localStorage.getItem('elevateTheme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-theme');
            updateThemeIcon(false);
        }

        // Load filter from LocalStorage
        const storedFilter = localStorage.getItem('elevateFilter');
        if(storedFilter) {
            currentFilter = storedFilter;
            // Update UI active class
            filterLinks.forEach(link => {
                if(link.dataset.filter === currentFilter) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        renderTasks();
    }

    // === Helper Functions ===
    function saveToStorage() {
        localStorage.setItem('elevateTasks', JSON.stringify(tasks));
    }

    function generateId() {
        return Date.now().toString() + Math.random().toString(36).substring(2, 7);
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const date = new Date(dateStr);
        // Fix timezone offset issue for local dates
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString(undefined, options);
    }

    function isOverdue(dateStr) {
        if (!dateStr) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(dateStr);
        dueDate.setMinutes(dueDate.getMinutes() + dueDate.getTimezoneOffset());
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // === Main Functions ===

    // ADD Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (title === '') return;

        const newTask = {
            id: generateId(),
            title: title,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask); // Add to beginning
        saveToStorage();
        
        taskInput.value = '';
        dueDateInput.value = '';
        
        // Reset filter to 'all' if they added a new task, so they see it
        if(currentFilter === 'completed') {
            document.querySelector('[data-filter="all"]').click();
        } else {
            renderTasks();
        }
    });

    // RENDER Tasks
    function renderTasks() {
        taskList.innerHTML = '';
        
        // Filter
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        // Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filteredTasks = filteredTasks.filter(t => t.title.toLowerCase().includes(lowerQuery));
        }

        // Update stats
        const activeCount = tasks.filter(t => !t.completed).length;
        tasksLeftCount.textContent = activeCount;

        // Visuals
        if (filteredTasks.length === 0) {
            emptyState.classList.remove('d-none');
        } else {
            emptyState.classList.add('d-none');
            
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `list-group-item task-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;
                
                const overdueClass = (!task.completed && isOverdue(task.dueDate)) ? 'overdue' : '';
                const dateHtml = task.dueDate ? `<span class="task-due ${overdueClass}"><i class="bi bi-calendar-event"></i> ${formatDate(task.dueDate)}</span>` : '';

                li.innerHTML = `
                    <div class="form-check m-0 d-flex align-items-center">
                        <input class="form-check-input custom-checkbox toggle-task" type="checkbox" ${task.completed ? 'checked' : ''}>
                    </div>
                    <div class="task-content ms-2" title="Click to toggle status">
                        <span class="task-title">${escapeHTML(task.title)}</span>
                        <div class="task-meta">
                            ${dateHtml}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn edit-btn" aria-label="Edit task" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="action-btn delete-btn" aria-label="Delete task" title="Delete">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                `;

                taskList.appendChild(li);
            });
        }
    }

    // EVENT DELEGATION FOR TASK LIST (Toggle, Edit, Delete)
    taskList.addEventListener('click', (e) => {
        const item = e.target.closest('.task-item');
        if (!item) return;
        
        const taskId = item.dataset.id;
        
        // Delete button
        if (e.target.closest('.delete-btn')) {
            item.classList.add('falling');
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== taskId);
                saveToStorage();
                renderTasks();
            }, 300); // Wait for animation
            return;
        }

        // Edit button
        if (e.target.closest('.edit-btn')) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                editTaskIdInput.value = task.id;
                editTaskNameInput.value = task.title;
                editDueDateInput.value = task.dueDate || '';
                editModal.show();
            }
            return;
        }

        // Toggle checkbox OR Clicking the text area toggles it
        if (e.target.closest('.toggle-task') || e.target.closest('.task-content')) {
            // Prevent double toggle if clicking directly on checkbox
            if(e.target.closest('.task-content')) {
                const checkbox = item.querySelector('.toggle-task');
                checkbox.checked = !checkbox.checked;
            }
            
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                saveToStorage();
                renderTasks(); // Re-render to strike-through and update counts
            }
        }
    });

    // Save Edit
    saveEditBtn.addEventListener('click', () => {
        const id = editTaskIdInput.value;
        const newTitle = editTaskNameInput.value.trim();
        const newDate = editDueDateInput.value;

        if (newTitle === '') return;

        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = newTitle;
            tasks[taskIndex].dueDate = newDate;
            saveToStorage();
            renderTasks();
            editModal.hide();
        }
    });

    // Filtering
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Update UI
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update State
            currentFilter = link.dataset.filter;
            localStorage.setItem('elevateFilter', currentFilter);
            renderTasks();
        });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderTasks();
    });

    // Clear Completed
    clearCompletedBtn.addEventListener('click', () => {
        const completedCount = tasks.filter(t => t.completed).length;
        if(completedCount === 0) return;

        if(confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            tasks = tasks.filter(t => !t.completed);
            saveToStorage();
            renderTasks();
        }
    });

    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        localStorage.setItem('elevateTheme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        if(isDark) {
            themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill text-warning"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        }
    }
});
