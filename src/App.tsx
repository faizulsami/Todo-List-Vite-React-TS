import AddTodo from "./components/AddTodo"
import Navbar from "./components/Navbar"
import ShowToDos from "./components/ShowToDos"
import './App.css'
const App = () => {
  return (
    <main>
      <h1>TODO React + Typescript</h1>
      <Navbar/>
      <AddTodo/>
      <ShowToDos/>
    </main>
  )
}

export default App