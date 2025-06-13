import TodoItem from "./todoItem";

import "./list.css";

import * as State from "./state";

export default function List() {
  const categoryItems = State.todos.value.reduce((acc: { [key: string]: State.Todo[] }, todo) => {
    const category = todo.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(todo);
    return acc;
  }, {});

  return (
    <>
      <div id="list">
      {Object.keys(categoryItems).map((category) => {
        const cat = State.categories.find(c => c.name === category);
        const bought = categoryItems[category].filter((todo) => todo.bought).length;
        const total = categoryItems[category].length;

        return (
          <div class="category" style={{backgroundColor: cat?.colour}}>
            <p>
              {cat?.icon}{category} ({bought}/{total})
            </p>
            
            {categoryItems[category].map((todo) => (
              <TodoItem todo={todo} />
            ))}
            
          </div>
        );
      })}
      </div>
    </>
    
  );
}