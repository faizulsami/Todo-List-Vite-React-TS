import { ReactNode, createContext, useContext, useState } from "react";

export type ToDosProviderProps = {
    children: ReactNode
}

export type ToDo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}
export type TodosContext = {
    todos: ToDo[];
    handleAddToDo:(task: string) => void;
    toggleToDoCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

export const toDosContext = createContext<TodosContext | null>(null);


export const ToDosProvider = ({children}: ToDosProviderProps) =>{
    const [todos, setToDos] = useState<ToDo[]>(() => {
        try {
            const newToDos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newToDos) as ToDo[]
        } catch (error) { 
            return [];
        }
    });
    const handleAddToDo = (task:string) =>{
        setToDos((prev)=>{
            const newToDos: ToDo[] = [
                {
                    id:Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos",JSON.stringify(newToDos))
            return newToDos;
        })
    }

    const toggleToDoCompleted = (id: string) =>{
        setToDos((prev)=>{
            const newToDos = prev.map((todo)=>{
                if (todo.id === id) {
                    return {...todo,completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newToDos))
            return newToDos
        })
    }

    const handleDeleteTodo = (id:string) =>{
        setToDos((prev)=>{
            const newToDos = prev.filter((filterTodo) => filterTodo.id !== id)
            localStorage.setItem("todos",JSON.stringify(newToDos))
            return newToDos;
        })
    }

    return <toDosContext.Provider value={{todos,handleAddToDo,toggleToDoCompleted,handleDeleteTodo }}>
        {children}
    </toDosContext.Provider>
}

// consumer
export const useToDos = () =>{
    const toDosConsumer = useContext(toDosContext);
    if (!toDosConsumer) {
        throw new Error("useToDos used outside of provider");
        
    }
    return toDosConsumer;
}
