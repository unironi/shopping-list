import Form from "./form-controlled";
import List from "./list";

import "./app.css";

// common approach is to import all state functions and properties like this
import * as State from "./state";
import Status from "./status";
import Settings from "./settings";

export default function App() {
  // figure out if we are editing a todo or not
  const editId = State.selectedTodoId.value;
  const initialValue = editId? State.getTodo(editId)?.name || "" : "";

  return (
    <>
      <div id="main">
        <Settings />
        <Form />
        <List />
        <Status />
      </div>
    </>
  );
}
