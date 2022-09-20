import { useContext } from "react"
import TodoContext from "../context/TodoContext"

export default function Todo({todo}) {
  const { completeTodo, deleteTodo} = useContext(TodoContext)
  return (
    <div
        key={todo._id}
        onClick={() => completeTodo(todo._id)}
        className={"todo " + (todo.complete ? "complete" : "")}
    >
        <div className="check"></div>
        <div className="text">{todo.text}</div>
        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
    </div>
  )
}
