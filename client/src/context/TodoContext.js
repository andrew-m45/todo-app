import { useState, useEffect, createContext } from 'react'

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])

    // fetch todos
    useEffect(() => {
        getTodos()
    }, [])


    // get all todos
    const getTodos = async () => {
        const res = await fetch('http://localhost:5000/todos')
        const data = await res.json()

        setTodos(data)
    }

    // update todo status
    const completeTodo = async (id) => {
        const res = await fetch(`http://localhost:5000/todo/complete/${id}`)
        const data = await res.json()

        setTodos(todos => todos.map((todo) => {
            if (todo._id === data._id) {
                todo.complete = data.complete
            }

            return todo
        }))
    }

    // delete todo
    const deleteTodo = async (id) => {
        const res = await fetch(`http://localhost:5000/todo/delete/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json()

        setTodos(todos => todos.filter((todo) => todo._id !== data._id))
    }

    // create new todo
    const addTodo = async (newTodoData) => {
        const res = await fetch(`http://localhost:5000/todo/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTodoData })

        })
        const data = await res.json()

        setTodos([...todos, data])
    }


    return <TodoContext.Provider value={{
        todos,
        getTodos,
        completeTodo,
        deleteTodo,
        addTodo
    }}>{children}</TodoContext.Provider>
}

export default TodoContext