import Form from "./form-controlled";
import List from "./list";

import "./app.css";

import Status from "./status";
import Settings from "./settings";

export default function App() {
  
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
