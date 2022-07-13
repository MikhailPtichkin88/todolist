import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type AddItemFormPropsType = {
    callback: (title: string) => void
    title: string
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm rendered')
    const [newTaskTitle, setNewTaskTitle] = useState(props.title)

    function onNewTitleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.key === 'Enter') {
            props.callback(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    function addTask() {
        const taskTitle = newTaskTitle.trim()
        if (taskTitle) {
            props.callback(taskTitle)
        } else {
            alert("Value must be added")
        }
        setNewTaskTitle("")
    }


    return (
        <div>
            <TextField onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       value={newTaskTitle}
                       label="New task"
                       variant="outlined"
                       color="primary"
                       size="small"/>
            <Button variant="contained"
                // size="small"
                    onClick={addTask}
                    style={{marginLeft: "10px", minWidth: '30px', maxWidth: '40px'}}><AddIcon color="inherit"/></Button>
        </div>
    );
});

export default AddItemForm;