import { ToDo, useToDos } from "../store/ToDos";
import { useSearchParams } from "react-router-dom";
const ShowToDos = () => {
    const { todos, toggleToDoCompleted, handleDeleteTodo } = useToDos();
    let filterData = todos;
    const [searchParams] = useSearchParams();
    const todosData = searchParams.get("todos")
    if (todosData === "active") {
        filterData = filterData.filter((task)=> !task.completed)
    }
    if (todosData === "completed") {
        filterData = filterData.filter((task)=> task.completed)
    }
    
    return (
        <ul className="main-task">
            {filterData.map((todo: ToDo) => (
                <li key={todo.id}>
                    <input type="checkbox" id={todo.id} checked={todo.completed} onChange={()=>toggleToDoCompleted(todo.id)}/>
                    <label htmlFor={todo.id}>{todo.task}</label>

                    {todo.completed && (
                        <button type="button" onClick={()=> handleDeleteTodo(todo.id)}>Delete</button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default ShowToDos;
