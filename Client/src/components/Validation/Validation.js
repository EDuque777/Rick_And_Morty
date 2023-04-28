const validation = (userData) => {
    const errors = {};


    if(!userData.email){
        errors.email = "Debe ingresar un email";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){
        errors.email = "El email ingresado no es valido";
    }
    else if(userData.email.length > 35){
        errors.email = "El email no debe superar los 35 caracteres"
    }

    if(!userData.password){
        errors.password = "Debe ingresar una contraseña";
    }
    else if(!/.*\d+.*/.test(userData.password)){
        errors.password = "La contraseña debe contener al menos un numero"
    }
    else if(userData.password.length < 6 ){
        errors.password = "La contraseña debe tener mas de 6 caracteres"
    }

    // if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){
    //     errors.email = "El email ingresado no es valido";
    // }
    // if(!userData.email){ //userData.email.length === ""
    //     errors.email = "Debe ingresar un email";
    // }
    // if(userData.email.length > 35){
    //     errors.email = "El email no debe superar los 35 caracteres";
    // }
    // if(!/.*\d+.*/.test(userData.password)){
    //     errors.password = "La contraseña debe contener al menos un numero"
    // }
    // if(userData.password.length < 6 || userData.password.length > 10){
    //     errors.password = "La contraseña debe terne un tamaño entre 6 y 10 caracteres"
    // }

    return errors;
}

export default validation