import "./expenses.css";
import "./edit.css"
import * as State from "./state";
import { useEffect, useState } from "preact/hooks";

interface ExpensesProps {
  setOpen: (open: boolean) => void;

}

interface itemExpense {
  name: string;
  quantity: number;
  price: number | null; 
  itemCost: number | null;
}

const priceCache: Record<string, number> = {};

export default function Expenses({ setOpen }: ExpensesProps) {

  const [items, setItems] = useState<itemExpense[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    let boughtItems = State.todos.value.filter((t) => t.bought);
    setItems(boughtItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: priceCache[item.name] || null,
      itemCost: priceCache[item.name] ? priceCache[item.name] * item.quantity : null,
    })));
  }, [State.todos.value]);

  async function fetchPrice(itemName: string): Promise<number> {
    const response = await fetch(`https://student.cs.uwaterloo.ca/~cs349/resources/prices.php?item=${itemName}`);
    const data = await response.json();
    return data.price;
  }

  useEffect(() => {
    items.forEach(item => {
      if (item.price === null) {
        fetchPrice(item.name).then(data => {
          priceCache[item.name] = data;
          setItems(items.map(i => i.name === item.name ? {...i, price: data, itemCost: data * i.quantity} : i));
        });
      }
      
    });
  }, [items]); 

  const updateTotalCost = () => {
    const newTotalCost = items.reduce((acc, item) => {
      return item.itemCost ? acc + item.itemCost : acc;
    }, 0);
    setTotalCost(newTotalCost);
  };

  useEffect(() => {
    updateTotalCost()
  }, [items]);
  
  return (
    <div class="expenses overlay">
      <table>
        <tbody>
          {items.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>{item.quantity} x</td>
              <td>
                {!item.price? <p class="loading"></p> : `$${item.price.toFixed(2)}`}
              </td>
              <td> = </td>
              <td>
                {!item.itemCost? <p class="loading"></p> : `$${item.itemCost.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>${totalCost.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <button onClick={() => setOpen(false)}>X</button>
    </div>
  );
}