import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";

import styles from "./TodoItem.module.css"

const TodoItem = props => {
   
    const [editing, setEditing] = useState(false)
   

    const handleEditing = () => {
        setEditing(true);
    }

    const handleUpdatedDone = e => {
        if (e.key === "Enter") {
            setEditing(false)
        }
    }

    const completedStyle = {
        fontStyle: "italic",
        color: "#595959",
        opacity: 0.4,
        textDecoration: "line-through",
    }

    const {completed, id, title} = props.todo;

    let viewMode = {}
    let editMode= {}

    //if styling property display of viewMode.display = "none", then the element is completely removed
    if (editing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }

    //Anytime you return a function inside the useEffect Hook, 
    //and then have no dependency in the array, the effect will run just once
    // and the return function will be called when the component 
    //is about to unmount.
    useEffect(() => {
        return function cleanup(){
            console.log("Cleaning up...")
        }
    },[])

    return (
        <li className={styles.item}>
            <div onDoubleClick={handleEditing} style={viewMode}>
             <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={completed} 
                onChange={() => props.handleChangeProps(id)}
            /> 
            <button className = "input-delete" onClick={() => props.deleteTodoProps(id)}>
                <FaTrash />
            </button>
            <span style={completed ? completedStyle : null}>
                 {title}
            </span>
            </div>
            <input 
                type="text" 
                style={editMode} 
                className={styles.textInput} 
                value={title}
                onChange={e => {
                    props.setUpdate(e.target.value, id)
                }}
                onKeyDown={handleUpdatedDone}
            />
        </li>
    );
}

export default TodoItem;