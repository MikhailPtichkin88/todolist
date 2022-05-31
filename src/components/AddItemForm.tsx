import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType={
    callBack: (title: string) => void
}


const AddItemForm = (props:AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.key === "Enter" && title.trim() !== "") {
            props.callBack(title.trim())
            setTitle("")
        } else {
            setError("error")
        }
    }

    function addTask() {
        if (title.trim() !== "") {
            props.callBack(title.trim())
            setTitle("")
        } else {
            setError("error")
        }
    }


    return (
        <div>
            <input onChange={onInputChange}
                   value={title}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error ? <div className="error-message">Please type task</div> : null}
        </div>
    );
};

export default AddItemForm;