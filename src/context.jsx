import React, {useContext, useEffect, useState} from 'react'
import { ALL_MEALS_URL } from './constants';
import axios from 'axios';

const AppContext = React.createContext();
const useGlobalContext = ()=>{
  return useContext(AppContext)
}
const AppProvider = ({children}) => {
  const [meals, setMeals] = useState([])
  useEffect(()=>{
    const fetchMeals = async()=>{
      try {
        const {data} = await axios.get(ALL_MEALS_URL)
        //console.log('response:', data);
        if(data.meals){
          setMeals(data.meals)}
          else {setMeals([])}
      } catch (error) {
        console.log('error:', error)
      }
    }
    fetchMeals()
  }, [])
  return (
    <AppContext.Provider value={{meals}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext, useGlobalContext }
