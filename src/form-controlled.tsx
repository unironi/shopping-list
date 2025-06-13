import {
    addTodo,
    categories,
    getTodo,
    selectedTodoId,
    updateTodo,
  } from "./state";
  import { useState } from "preact/hooks";

  import * as State from "./state"
  
  import "./form.css";
  
  export default function Form() {
    // local state for "controlled input"
    const [quantity, setQuantity] = useState(
      selectedTodoId.value? getTodo(selectedTodoId.value)?.quantity || 1 : 1
    );

    const [name, setName] = useState(
      selectedTodoId.value? getTodo(selectedTodoId.value)?.name || "null" : ""
    );

    const [category, setCategory] = useState(
      selectedTodoId.value? getTodo(selectedTodoId.value)?.category || "Other" : "Other"
    );

    const [disabled, setDisabled] = useState(false);
  
    // update local state when user types
    function inputHandler(e: Event) {
      let newValue = (e.target as HTMLInputElement).value;
      newValue = newValue.replace(/^\s+|[^A-Za-z\s]/g, "");
      setName(newValue);
    }

    function counterHandler(e: Event) {
      let val = (e.target as HTMLInputElement).value;
      val = val.replace(/[^0-9]/g, "");
      setQuantity(Number(val));
    }

    function categoryHandler(e: Event) {
      let existing = State.todos.value.find(todo => todo.name == name)
      let val = (e.target as HTMLSelectElement).value;
      if (existing) {
        setDisabled(true);
      } else {
        setCategory(val);
        setDisabled(false);
      }
      
    }
  
    function handleSubmit(e: Event) {
      //if (selectedTodoId.value) {
        //updateTodo(selectedTodoId.value, { quantity: quantity });
      //} else {
        addTodo(name, quantity, category);
      //}
      setName("");
      setQuantity(1);
      setCategory("Other");
    }

    function handleSubmitEnter(e: KeyboardEvent) {
      if (e.key == 'Enter') {
        handleSubmit(e);
      }
    }
  
    return (
      <div id="form">
        <div class="add">
          <input type="text" onKeyDown={handleSubmitEnter} onInput={inputHandler} value={name} placeholder={"Item Name"}/>
          <input type="number" onKeyDown={handleSubmitEnter} onInput={counterHandler} min={1} max={24} value={quantity} />
          <select value={category} onChange={categoryHandler} disabled={disabled}>
            {categories.map((cat) => (
              <option value={cat.name}>{cat.icon}</option>
            ))}
          </select>
          <button onClick={handleSubmit}>
            ➕
          </button>
        </div>
      </div>
    );
  }
  