import "./todoItem.css";
import { updateTodo } from "./state";
import * as State from "./state";

type TodoItemProps = {
  todo: State.Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {

  const handleInput = (name: string, newQuantity: number) => {
    updateTodo(name, {quantity: newQuantity})
  };

  return (
    <div class="todo" key={todo.name}>
      <input
        type="checkbox"
        checked={todo.bought}
        onInput={() =>
          State.updateTodo(todo.name, { bought: !todo.bought })
        }
      />
      <span>
        {todo.name}
      </span>
      <input 
        type="number"
        value={todo.quantity}
        min="1"
        max="24"
        onChange={e => handleInput(todo.name, Number((e.currentTarget as HTMLInputElement).value))}
      />
      <button onClick={() => State.deleteTodo(todo.name)}>❌</button>
    </div>
  );
}
