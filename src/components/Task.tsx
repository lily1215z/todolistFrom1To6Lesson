import React, {ChangeEvent} from 'react';
import style from '../App.module.css'
import {EditableItem} from "./EditableItem";

type TaskType = {
    todoListId: string
    removeTask: (taskId: string, todoListId: string) => void
    taskId: string,
    check: boolean,
    title: string
    changeStatusTask: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (newTitle: string) => void
}

export const Task: React.FC<TaskType> = ({
                                             todoListId,
                                             removeTask,
                                             taskId,
                                             check,
                                             title,
                                             changeStatusTask,
                                             changeTaskTitle
                                         }) => {

    const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatusTask(todoListId, taskId, e.currentTarget.checked)
    }

    const styleForTasksTitle = {
        marginLeft: '5px',
        fontFamily: "'Oleo Script Swash Caps', cursive",
        fontSize: '18px',
    }

    return (
        <>
            {
                <li className={style.item}>
                    <input
                        checked={check}
                        type={'checkbox'}
                        onChange={changeStatusTaskHandler}
                        className={check ? `${style.item_input}` : `${style.item_active}`}
                    />
                    <div className={style.item_editbox}>
                        <EditableItem
                            addItem={changeTaskTitle}
                            titleInState={title}
                            styleTitle={styleForTasksTitle}
                        />
                        {/*<span className={style.item_title}>{title}</span>*/}
                    </div>

                    <button className={style.item_btn} onClick={() => removeTask(taskId, todoListId)}></button>
                </li>
            }
        </>
    );
};

