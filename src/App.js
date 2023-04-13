import './App.css';
import Cards from './components/Cards/Cards';
import Nav from "./components/Nav/Nav";
import About from './components/About/About';
import Deatil from './components/Deatil/Deatil';
import Form from "./components/Form/Form";
import Favorites from './components/Favorites/Favorites';
import {useState, useEffect} from "react";
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
const API_KEY = "ef7da272cb9f.6851342bb738c4799246";

const email = "Esteban.duque911@gmail.com";
const password = "Esteban7"

function App() {

   const location = useLocation();
   //console.log(location)

   const navigate = useNavigate();

   const [characters, setCharacters] = useState([]);

   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true)
         navigate("/home")
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access]);

   //buscar personaje
   const onSearch = (id) => {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`)
      //.then(response => response.data) //otra forma de hacerlo.
      //.then((data) => {
      .then(({ data }) => {
         if (data.name) {

            const characterExists = characters.some(character => character.id === data.id) // esta parte es un ejercicio extra el cual no repite personajes

            if(characterExists){
               alert("¡Este personaje ya está en la lista!");
            }
            else{
            setCharacters((oldChars) => [...oldChars, data]);
            }
         } 
         else {
            alert("¡No hay personajes con este ID!");
         }
      })

      .catch(error => { //puse este codigo para solucionar el error al colocar un id que no existe
         console.error(error);
         alert("¡Hubo un problema al buscar el personaje!");
       });
   }


   const onClose = (id) => { 
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }

   return (

      <div className='App'>

         {/* Primera Forma */}
         {/* {
            location.pathname !== "/" ? <Nav onSearch={onSearch}/> : null
         } */}


         {/* Segunda Forma */}
         {
            location.pathname !== "/" && <Nav onSearch={onSearch} setAccess={setAccess}/>
         }
         

         <Routes>
            <Route path="/" element={<Form login={login}/>}/>
            <Route path="/home" element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/detail/:id" element={<Deatil/>}/>
            <Route path="/favorites" element={<Favorites/>} />
         </Routes>

      </div>

   );

}

export default App;