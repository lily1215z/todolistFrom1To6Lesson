import React, {useState} from 'react';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList";
import {UniversalInput} from "./components/UniversalInput";
import style from './App.module.css'
import tall from './image/tall2.png'
import {EditableItem} from "./components/EditableItem";

export type TodoListFilterType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string,
    title: string,
    filter: TodoListFilterType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const todoListId3 = v1();

    const [todolist, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'Daily affairs', filter: 'all'},
        {id: todoListId2, title: 'My deals on camp', filter: 'all'},
        {id: todoListId3, title: 'What to take to camp', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksType>({
            [todoListId1]: [
                {id: v1(), title: 'wash up', isDone: false},
                {id: v1(), title: 'brush your teeth', isDone: true},
                {id: v1(), title: 'make the bed', isDone: false},
                {id: v1(), title: 'read a book', isDone: false},
                {id: v1(), title: 'take vitamins', isDone: false},
                {id: v1(), title: 'draw', isDone: true},
                {id: v1(), title: 'help mom', isDone: false},
                {id: v1(), title: 'put away toys', isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: 'to plant a tree', isDone: false},
                {id: v1(), title: 'fall in love', isDone: true},
                {id: v1(), title: 'save the raccoon', isDone: false},
                {id: v1(), title: 'spend the night in the forest', isDone: false}
            ],
            [todoListId3]: [
                {id: v1(), title: 'backpack', isDone: false},
                {id: v1(), title: 'food', isDone: false},
                {id: v1(), title: 'things', isDone: true},
                {id: v1(), title: 'myself', isDone: false},
            ]
        }
    )

    const removeTask = (taskId: string, todoListId: string) => {
        const filterTasks = tasks[todoListId].filter(i => i.id !== taskId)
        setTasks({...tasks, [todoListId]: filterTasks});
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeFilter = (todoListId: string, value: TodoListFilterType) => {
        let todolistV = todolist.find(i => i.id === todoListId);
        if (todolistV) {
            todolistV.filter = value;
            setTodoList([...todolist])
        }
    }

    const changeStatusTask = (todoListId: string, taskId: string, isDone: boolean) => {
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t=> t.id === taskId ? {...t, isDone: isDone} : t)})
        //or
        tasks[todoListId].map(i => {
            if (i.id === taskId) {
                i.isDone = isDone
                setTasks({...tasks})
            }
        })
    }

    const removeTodoList = (todoListId: string) => {
        setTodoList(todolist.filter(i => i.id !== todoListId))
    }

    const addTodoList = (title: string) => {
        let newTodoListId = v1()  //обязет нужна переменная чтоб ею связать таски и тодолист.
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'};
        setTodoList([newTodoList, ...todolist])
        setTasks({...tasks, [newTodoListId]: []})  //нужно д/того чтоб вывести полностью. Т.к. без него в Тодолисте
        //мы мапим Таск и туде бприйдет андефайнид и будет белый лист при добавлении тодолтста
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const todolistV = todolist.find(i => i.id === todoListId);
        if (todolistV) {
            todolistV.title = title;
            setTodoList([...todolist]);
        }
    }

    const changeTaskTitle = (title: string, todoListId: string, taskId: string) => {
        let todolistTasks = tasks[todoListId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.title = title;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    return (
        <div className={style.wrapper}>
            <header className={style.header}>
                <h1 className={style.title}>My first things...</h1>
            </header>

            <main className={style.main}>
                <div className={style.tall}>
                    <img width={480} src={tall} />
                </div>
                <div className={style.plan}>
                    <div className={style.plan_add}>
                        <h2 className={style.plan_title}>My plans</h2>
                        <div className={style.plan_img}>
                            <UniversalInput
                                placeholder={'write the name of your list'}
                                addItem={addTodoList}
                            />
                        </div>

                    </div>
                    <div className={style.card_box}>
                        {
                            todolist.map(i => {
                                let allTasksTodoLists = tasks[i.id]
                                let tasksForTodoList = allTasksTodoLists

                                if (i.filter === "active") {
                                    tasksForTodoList = allTasksTodoLists.filter(i => i.isDone === false)
                                }
                                if (i.filter === "completed") {
                                    tasksForTodoList = allTasksTodoLists.filter(i => i.isDone)
                                }
                                return <TodoList
                                    key={i.id}
                                    todoListId={i.id}
                                    tasks={tasksForTodoList}
                                    todoListTitle={i.title}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeStatusTask={changeStatusTask}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            })
                        }
                    </div>

                </div>

            </main>

            <footer className={style.footer}>
                Not Copyright 2022 • My first things... Webflow cloneable. All rights reserved
            </footer>
        </div>
    );
}

export default App;
