import * as State from "./state";
import "./edit.css"
import { updateTodo } from "./state";
import { useEffect, useState } from "preact/hooks";

interface EditProps {
    setEdit: (edit: boolean) => void;
   //todos: Todo[];
    //updateTodo: (name: string, todo: { category?: string }) => void;
}

export default function Edit({ setEdit }: EditProps) {

    const [todos, setTodos] = useState(State.allTodos.value);

    useEffect(() => {
        setTodos([...State.allTodos.value]);
    }, [State.allTodos.value]);

    const handleCategory = (name: string, newCategory: string) => {
        updateTodo(name, { category: newCategory });
    };

    return(
        <div class="grid overlay"> 
            {todos.map(t => {
                return(
                    <div>
                        <p>{t.name}</p>
                        <select value={t.category} onChange={e => handleCategory(t.name, (e.target as HTMLSelectElement).value)}>
                        {State.categories.map((cat) => (
                            <option value={cat.name}>{cat.icon}{cat.name}</option>
                        ))}
                        </select>
                    </div>
                );
            })}
            <button onClick={() => setEdit(false)}>X</button>
        </div>
    );
}

