https://meals-application.john-smilga.repl.co/

#### Create Global CSS in App.css
*,
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
}

:root {
  /* color */
  --primary-50: #f5f9ff;
  --primary-100: #d0e1fd;
  --primary-200: #abc9fb;
  --primary-300: #85b2f9;
  --primary-400: #609af8;
  --primary-500: #3b82f6;
  --primary-600: #326fd1;
  --primary-700: #295bac;
  --primary-800: #204887;
  --primary-900: #183462;

  --grey-50: #f9fafb;
  --grey-100: #f3f4f6;
  --grey-200: #e5e7eb;
  --grey-300: #d1d5db;
  --grey-400: #9ca3af;
  --grey-500: #6b7280;
  --grey-600: #4b5563;
  --grey-700: #374151;
  --grey-800: #1f2937;
  --grey-800: #111827;

  /* rest of color */
  --black: #222;
  --white: #fff;
  --red-light: #f8d7da;
  --red-dark: #842029;
  --green-light: #d1e7dd;
  --green-dark: #0f5132;

  /* font */
  --small-text: 0.875rem;
  --extra-small-text: 0.5em;

  --backgroundColor: var(--grey-100);
  --textColor: var(--grey-900);
  --borderRadius: 0.25rem;
  --letterSpacing: 1px;
  --transition: 0.3s ease-in-out all;
  --max-width: 1120px;
  --fixed-width: 600px;
  --view-width: 90vw;

  /* box shadow */
  --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.06);
  --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

body {
  background-color: var(--backgroundColor);
  /* Default sanserif */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  /* Line spacing is 1.75 times the element's font size */
  line-height: 1.75;
  color: var(--textColor);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: 400;
  line-height: 1.3;
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
}

small, 
.text-small {
  font-size: var(--small-text);
}

a {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

.img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.btn {
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
}

.btn-hipster {
  color: var(--primary-500);
  background: var(--primary-200);
}

.btn-hipster:hover {
  color: var(--white);
  background: var(--black);
}

.btn-block {
  width: 100%;
}
/* End global styles */
/* End global styles */
/* End global styles */


#### Create src/component
Create Favorites.jsx, Meal.jsx, Modal.jsx, Search.jsx
Import all of them in App.jsx like this:
import React from 'react'
import Search from './components/Search'
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'

const App = () => {
  return (
    <div>
      <Search />
      <Favorites />
      <Meals />
      <Modal />
    </div>
  )
}
export default App

#### App level state
- Context Provider, API
- create context.jsx
import React, { useContext } from 'react'
export const AppContext = React.createContext();
const AppProvider = ({children}) => {
  return (
    <AppContext.Provider
      value="hello"
    >
      { children }
    </AppContext.Provider>
  )
}
export default AppProvider

#### import AppProvider to main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context.jsx'
import './App.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)

#### import AppContext in Meals.jsx
- using hook 'useContext' in Meals.jsx to get context value
import React, { useContext } from 'react'
import { AppContext } from '../context'

const Meals = () => {
  const context = useContext(AppContext);
  console.log('context', context);

  return (
    <div>Meals</div>
  )
}
export default Meals

### Custom Hook in context.jsx
import React, { useContext } from 'react'
const AppContext = React.createContext();
const useGlobalContext = () => {
  return useContext(AppContext);
}
const AppProvider = ({children}) => {
  return (
    <AppContext.Provider
      value="hello"
    >
      { children }
    </AppContext.Provider>
  )
}
export { AppProvider, useGlobalContext }

#### fetching data using fetch or api https://www.themealdb.com/api.php
- create folder src/constant
- create ALL_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
- create RANDOM_MEAL_URL = ''
- fetch data in useEffect in context.jsx https://www.themealdb.com/api/json/v1/1/random.php
const AppProvider = ({ children }) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchData()
  }, [])
  return()
} 


#### npm i axios
- Write function fetch Data with axios in context.jsx
const AppProvider = ({ children }) => {
  const fetchMeals = async (url) => {
    try {
      const { data } = await axios.get(url)
    } catch (error) {
      console.log("error", error)
    }
  } 
  useEffect(() => {
    fetchMeals(ALL_MEALS_URL)
  }, [])
  return ()
}
- useState meals in context.jsx
- setState when fetching meal success
- pass meals state to value of context
- get meals state in component Meals
const [meals, setMeals] = useState([]);

  const fetchMeals = async (url) => {
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  
  useEffect(() => {
    fetchMeals(ALL_MEALS_URL)
  }, [])

  return (
    <AppContext.Provider
      value={{meals}}
    >
      { children }
    </AppContext.Provider>
  )


#### render meals array in component Meals.jsx
const Meals = () => {
  const { meals } = useGlobalContext()
  return (
    <div className='section-center'>
      {meals.map(meal => {
        const { idMeal, strMeal: title, strMealThumb: image} = meal;
        return (
          <div key={idMeal} className='single-meal'>
            <img src={image} className='img' alt="meal-image" />
            <div>
              <h5>{title}</h5>
              <button className='like-btn'>Click me</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}


#### CSS for Meals Component
/* Meals */
.section, .section-center {
  padding: 3rem 0;
  width: var(--view-width);
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-center {
  display: grid;
  gap: 2rem;
}

.single-meal {
  background-color: var(--white);
  color: var(--textColor);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
}

.single-meal:hover {
  box-shadow: var(--shadow-4);
}

.single-meal img {
  height: 15rem;
  border-top-left-radius: var(--borderRadius);
  border-top-right-radius: var(--borderRadius);
  cursor: pointer;
}

.single-meal h5 {
  padding: 0;
  margin: 0;
}

.single-meal .footer {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.like-btn {
  background: transparent;
  border: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
}

.like-btn:hover {
  color: var(--red-dark);
  transform: translateY(-2px);
}

@media screen and (min-width: 776px) {
  .section-center {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1024px) {
  .section-center {
    grid-template-columns: 1fr 1fr 1fr;
  }
}


#### install lib react-icon
npm i react-icons
- import icon to Meals component
import { BsHandThumbsUp } from "react-icons/bs";
<BsHandThumbsUp />


#### add loading in Meals Component and check no item
- setState loading with default value false in context.jsx
- set Loading true in fetchMeals
- set Loading as the last thing in fetchMeals
- add state loading to value context
- in Meals component check state loading if true -> show loading, if not show data

  if (loading) {
    return (
      <div className='section'>Loading...</div>
    )
  }

  if (meals.length < 1) {
    return (
      <div className='section'>No items...</div>
    )
  }

  return (
    <div className='section-center'>
      {meals?.map(meal => {
        const { idMeal, strMeal: title, strMealThumb: image} = meal;
        return (
          <div key={idMeal} className='single-meal'>
            <img src={image} className='img' alt="meal-image" />
            <div className='footer'>
              <h5>{title}</h5>
              <button className='like-btn'><BsHandThumbsUp /></button>
            </div>
          </div>
        )
      })}
    </div>
  )

#### Search Component 
- import useState and useGlobalContext() in Search.jsx
- create handleChange, handleSubmit in Search Component\

#### CSS for Search component
/* Search component */
.search-container {
  height: 5rem;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-container form {
  width: var(--view-width);
  max-width: var(--max-width);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.search-container .form-input {
  max-width: 200px;
  padding: 0.375rem 0.75rem;
  border-radius: var(--borderRadius);
  background: var(--backgroundColor);
  border: 1px solid var(--grey-200);
}

::placeholder {
  font-family: inherit;
  color: var(--grey-400);
}

.search-container .btn {
  font-size: 0.75rem;
}
























