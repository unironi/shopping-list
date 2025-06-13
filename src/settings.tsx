import { useState } from "preact/hooks";
import "./settings.css"
import Edit from "./edit";
import Expenses from "./expenses";

export default function Settings() {

    const [edit, setEdit] = useState(false);
    const [expenses, setExpenses] = useState(false);

    function editHandler() {
        edit? setEdit(false) : setEdit(true);
    }

    function expensesHandler() {
        expenses? setExpenses(false) : setExpenses(true);
    }

    return(
        <div class="settings">
          <button onClick={editHandler}>✍🏻 Edit Categories</button>
          <button onClick={expensesHandler}>💵 Show Expenses</button>
          {edit && <Edit setEdit={setEdit}/>}
          {expenses && <Expenses setOpen={setExpenses}/>}
        </div> // passing setEdit and setExpenses properties to be able to close the page by hitting "X"
    );
}