import { useContext, useState } from "react"
import TodoContext from "../context/TodoContext"

export default function AddTodo({handleModalAction}) {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo } = useContext(TodoContext)

  const handleAdd = () => {
    addTodo(newTodo)
    setNewTodo('')
  }
  
  return (
    <div className='modal'>
            <div className="closeModal" onClick={handleModalAction}>x</div>
            <div className="content">
              <h3>Add Task</h3>
              <input
                type="text"
                className='add-todo-input'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button className='button' onClick={handleAdd}>Add Task</button>
            </div>
    </div>
  )
}
