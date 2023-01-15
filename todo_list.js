document.addEventListener('DOMContentLoaded', function() {
    // Get elements from the popup
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    chrome.storage.sync.get('taskList', function(data) {
    if(data.taskList) {
        taskList.innerHTML = data.taskList;
        const checkboxes = taskList.getElementsByTagName('input');
        const li_elements = taskList.getElementsByTagName('li');
        for (let i = 0; i < li_elements.length; i++) {
            let li = li_elements[i]
            checkboxes[i].addEventListener("change", function(){
                if(this.checked){
                    let timeoutId;
                    li.classList.add('fade-out');
                    timeoutId = setTimeout(function(){
                    li.remove();
                    // Store the task list in chrome.storage
                    chrome.storage.sync.set({'taskList': taskList.innerHTML});
                    }, 2000)
                }else{
                    this.parentNode.classList.remove("completed");
                }
                // Store the task list in chrome.storage
                chrome.storage.local.set({'taskList': taskList.innerHTML});
            })
        };
    }
    });

    // Add event listener for the add task button
    addTaskButton.addEventListener('click', addTask);

    // Function to add a task to the list
    function addTask(e) {
        e.preventDefault();
        // rest of the code
        // Get the task input value
        const task = taskInput.value;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create a new list item
        const li = document.createElement('li');

        // Add the task text to the list item
        li.appendChild(document.createTextNode(task));
        li.prepend(checkbox);

        checkbox.addEventListener("change", function(){
            if(this.checked){
                let timeoutId;
                li.classList.add('fade-out');
                timeoutId = setTimeout(function(){
                    li.remove();
                    // Store the task list in chrome.storage
                    chrome.storage.sync.set({'taskList': taskList.innerHTML});
                }, 2000);
                checkbox.addEventListener("change", function(){
                    clearTimeout(timeoutId);
                });
                
            }else{
                li.classList.remove('fade-out')
            }
        });
    

        // Add the list item to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';

        // Store the task list in chrome.storage
        chrome.storage.sync.set({'taskList': taskList.innerHTML});
    }
});


