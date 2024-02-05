import React from 'react'
import { useGlobalContext } from '../context'
import { FaRegThumbsUp } from "react-icons/fa";
const Meals = () => {
  const {meals} = useGlobalContext();
  console.log('meals:', meals)
  return (
    <div className='meal-container'>
      {
        meals.map((meal)=>{
          const {idMeal: id, strMeal: name, strMealThumb: image} = meal
          return (
            <div key = {id} className='meal-item'>
              <img style={{width: '100%', height: 300}} src={image} alt=''/>
              <div className='new-item-footer'>
                <p>{name}</p>
                <button><FaRegThumbsUp /></button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Meals
