import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    className?: string
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const [error, setError] = useState<null | string>(null)

    const editTrueHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    function addTask() {
        props.callBack(newTitle)
    }

    function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && newTitle.trim() !== "") {
            editTrueHandler()
        } else {
            setError("error")
        }
    }

    let editClass = props.className ? `${props.className} edit_span` : "edit_span"
    return (

        edit
            ? <input type="text" value={newTitle}
                     onChange={onChangeHandler}
                     onBlur={editTrueHandler}
                     autoFocus
                     onDoubleClick={addTask}
                     onKeyDown={onKeyDownHandler}
                     className="edit_input"/>
            : <span onDoubleClick={editTrueHandler}
                    className={editClass}>{props.title}</span>

    );
};

export default EditableSpan;