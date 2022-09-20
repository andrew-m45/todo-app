import { useState } from 'react'

// import Todo Provider
import { TodoProvider } from './context/TodoContext'

// components
import AddTodoModal from './components/AddTodoModal'
import TodoList from './components/TodoList'


function App() {
  // add task modal state
  const [modalActive, setModalActive] = useState(false)

  // close add task modal 
  const handleModalAction = () => setModalActive(false)

  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo App</h1>
        <h4>Your Tasks</h4>
        <TodoList />
        <div className="addModal" onClick={() => setModalActive(true)}>+</div>
        {modalActive && <AddTodoModal handleModalAction={handleModalAction} />}
      </div>
    </TodoProvider>
  );
}

export default App;
