import React, {useState} from "react";
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: "Task component",
    component: Task,
    decorators:[ReduxStoreProviderDecorator],

} as ComponentMeta<typeof Task>

export const TaskBaseExample = (props: any) => {

    return <>
        <Task todolistId={'todolistId1'} taskId={"1"} title="CSS" isDone={true}/>
        <Task todolistId={'todolistId2'} taskId={"2"} title="HTML" isDone={false}/>
    </>
}
const Template: ComponentStory<typeof  Task> = ()=>{
    const [task, setTask]= useState("title")
    return  <Task todolistId={"todolist1"} taskId={'111'} title={task} isDone={true}/>
}

export const TaskSecondExample = Template.bind({})