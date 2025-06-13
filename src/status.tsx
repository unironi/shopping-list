import "./status.css"

import * as State from "./state";

export default function Status() {
    return(
        <span class="bouncy-text">There are a total of {State.num} items!</span>
    )
}