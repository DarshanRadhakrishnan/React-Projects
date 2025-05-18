import React, { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(["Wake Up", "Boil Eggs", "Drink Water"]);
    const [newTask, setNewTask] = useState("");

    function handleNewTask(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function removeTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index - 1 >= 0) {
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            setTasks(newTasks);
        }
    }

    function moveDown(index) {
        if (index + 1 < tasks.length) {
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            setTasks(newTasks);
        }
    }

    const displayItems = tasks.map((element, index) => (
        <li key={index}>
            {element}
            <button className="delete-button" onClick={() => removeTask(index)}>Delete</button>
            <button className="move-button" onClick={() => moveUp(index)}>&#9757;</button>
            <button className="move-button" onClick={() => moveDown(index)}>&#128071;</button>
        </li>
    ));

    return (
        <div className="mainContainer">
            <h1>To Do List</h1>
            <div className="tasks">
                <ul>{displayItems}</ul>
            </div>
            <div className="inp">
            <input
                value={newTask}
                type="text"
                placeholder="Enter the Task"
                onChange={handleNewTask}
            />
            <button className="add-button" onClick={addTask}>Add Task</button>
            </div>
        </div>
    );
}

export default ToDoList;
