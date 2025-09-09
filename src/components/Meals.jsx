import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

let customerObj = {};

export default function Meals() {
  const {
    data: isLoadingMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", customerObj, []);

  if (isLoading) {
    return <p className="center">Fetching Data...</p>;
  }

  if(error) {
    return <Error title="Filed Not send Request." message={error}/>
  }

  return (
    <ul id="meals">
      {isLoadingMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
