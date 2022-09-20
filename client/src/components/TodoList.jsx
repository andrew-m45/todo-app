import { useContext } from "react"
import TodoContext from "../context/TodoContext"
import Todo from "./Todo"

export default function TodoList() {
  const { todos } = useContext(TodoContext)

  return (
    <div className="todos">
        {todos && todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
        ))}
    </div>
  )
}
