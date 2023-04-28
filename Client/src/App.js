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


// const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
// const API_KEY = "ef7da272cb9f.6851342bb738c4799246";

// const email = "Esteban.duque911@gmail.com";
// const password = "Esteban7"

const URL = 'http://localhost:3001/rickandmorty/login';

function App() {

   const location = useLocation();
   //console.log(location)

   const navigate = useNavigate();

   const [characters, setCharacters] = useState([]);

   const [access, setAccess] = useState(false);



   const login = async (userData) => {

      try {

         const { email, password } = userData;
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;

            setAccess(access);
            access && navigate('/home');
         
      } catch (error) {
         console.log(error.message)
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access, navigate]);

   //buscar personaje
   const onSearch = async (id) => {

      try {

         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)

            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } 
         
      } catch (error) {
         alert("¡No hay personajes con este ID!");
      }
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