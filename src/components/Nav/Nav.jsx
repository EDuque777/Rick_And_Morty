import SearchBar from "../SearchBar/SearchBar";
import {Link} from "react-router-dom"

const Nav = ({onSearch, setAccess}) => {

    //para hacerlo de la segunda forma se tiene que comentar o eliminar el handleLogOut 
    const handleLogOut = () => {
        setAccess(false);
    }

    return(

        <div>

            <SearchBar onSearch={onSearch}/>

            <button>
                <Link to="/about">ABOUT</Link>
            </button>

            <button>
                <Link to="/home">HOME</Link>
            </button>

            <button>
                <Link to="/favorites">FAVORITES</Link>
            </button>

            {/* primera forma */}
            <button onClick={handleLogOut}>LOG OUT</button>

            {/* segunda forma */}
            {/* <Link to="/">LOG OUT</Link> */}

        </div>
        
    )

}

export default Nav;