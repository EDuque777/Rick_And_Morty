import { useState } from "react"
import validation from "../Validation/Validation"

const Form = ({login}) => {

    const [errors, setErrors] = useState({

    })

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        login(userData);
    }

    return(

        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email: </label>
            <input name="email" type="email" value={userData.email} onChange={handleChange}/>
            {errors.email && <p>{errors.email}</p>}

            <hr/>

            <label htmlFor="password">Password</label>
            <input name="password" type="text" value={userData.password} onChange={handleChange}/>
            {errors.password && <p>{errors.password}</p>}

            <hr/>

            <button>Submit</button>

        </form>

    )
}
export default Form