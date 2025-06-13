import { computed, signal } from "@preact/signals";

export type Todo = {
  name: string;
  quantity: number;
  category: string
  bought: boolean;
};

export const categories = [
  { icon: '🥛', name: "Dairy", colour: `hsl(220, 75%, 75%)` },
  { icon: '🧊', name: "Frozen", colour: `hsl(220, 90%, 95%)` },
  { icon: '🍌', name: "Fruit", colour: `hsl(140, 75%, 75%)` },
  { icon: '🛒', name: "Other", colour: `hsl(0, 0%, 90%)` }
];

export const sampleItems = [
  { "name": "Apples", "quantity": 3, "category": "Fruit", "bought": false },
  { "name": "Bananas", "quantity": 6, "category": "Fruit", "bought": true },
  { "name": "Burritos", "quantity": 0, "category": "Frozen", "bought": false },
  { "name": "Cheese", "quantity": 1, "category": "Dairy", "bought": false },
  { "name": "Eggs", "quantity": 12, "category": "Other", "bought": false },
  { "name": "Milk", "quantity": 4, "category": "Dairy", "bought": false },
  { "name": "Olive Oil", "quantity": 0, "category": "Other", "bought": false },
  { "name": "Oranges", "quantity": 0, "category": "Fruit", "bought": false },
  { "name": "Pizza", "quantity": 0, "category": "Frozen", "bought": false },
  { "name": "Waffles", "quantity": 2, "category": "Frozen", "bought": false },
  { "name": "Yogurt", "quantity": 1, "category": "Dairy", "bought": true }
];

//#region state

// the array of all Todos
export const todos = signal<Todo[]>(randInit(sampleItems));
export const allTodos = signal<Todo[]>(sampleItems);

export const num = computed(() => todos.value.length);

export const numDone = computed(
  () => todos.value.filter((t) => t.bought).length
);

// selected todo ID (for editing)
export const selectedTodoId = signal<string | null>(null);

//#endregion

//#region convenience functions

// Read
export const getTodo = (name: string): Todo | undefined => {
  return todos.value.find((t) => t.name === name);
};

//#endregion

//#region mutations

// model "business logic" (CRUD)

// Create
export const addTodo = (name: string, quantity: number, category: string) => {
  const dupe = todos.value.find(todo => todo.name === name);
  if (name != "") {
    if (dupe) {
      todos.value = todos.value.map(t => t.name === name ? { ...t, quantity: t.quantity + quantity > 24 ? 24: t.quantity + quantity } : t);
      allTodos.value = allTodos.value.map(t => t.name === name ? { ...t, quantity: t.quantity + quantity > 24 ? 24: t.quantity + quantity } : t);
    } else {
      todos.value = [
        ...todos.value,
        {
          quantity,
          name,
          category,
          bought: false,
        },
      ];
      allTodos.value = [
        ...allTodos.value,
        {
          quantity,
          name,
          category,
          bought: false,
        },
      ];
    }
  }
  todos.value = sort(todos.value);
  allTodos.value = sort(allTodos.value);
  //selectedTodoId.value = null;
};

// Update
export const updateTodo = (
  name: string,
  todo: { quantity?: number; category?: string; bought?: boolean }
) => {
  todos.value = todos.value.map((t) =>
    // if todo matches id, then spread it and replace
    // with defined properties in todo object argument
    t.name === name ? { ...t, ...todo } : t
  );
  allTodos.value = allTodos.value.map((t) =>
    t.name === name ? { ...t, ...todo } : t
  );
};

// Delete
export const deleteTodo = (name: string) => {
  todos.value = todos.value.filter((t) => t.name !== name);
  // edge case if editing a todo that is deleted
  if (selectedTodoId.value === name) {
    selectedTodoId.value = null;
  }
};

//#endregion

//#region helpers

function sort(arr: Array<Todo>) {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
}

function randInit(items: Array<Todo>) { // function to pick 3 random sample items
  const shuffled = items.sort(() => 0.5 - Math.random()); 
  return sort(shuffled.slice(0, 5));
}

//#endregion
