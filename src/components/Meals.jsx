import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";
import Modal from "./UI/Modal.jsx";

export default function Meals() {
  const [isLoadingMeals, setIsLoadingMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
      }
      const data = await response.json();
      setIsLoadingMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    
    <ul id="meals">
      {isLoadingMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
    
  );
}
