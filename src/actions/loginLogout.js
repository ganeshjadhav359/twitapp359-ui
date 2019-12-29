

const removeLocalStorage =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn')
}

const setLocalStorage = (token,userData)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('isLoggedIn',true);
    localStorage.setItem('userData',JSON.stringify(userData));
}

export const login = (token,userData)=>{
    console.log(token,userData);
    return ( dispatch ) =>{
        setLocalStorage(token,userData);
        dispatch({type:'LOGGED_IN',payload:true});
        dispatch({type:'LoginToken',payload:token});
        dispatch({type:'USER_DATA',payload:userData});
    }
}

export const logout =()=>{
    console.log("log out action");
    return (dispatch) =>{
        removeLocalStorage();
        dispatch({type:'LOGGED_IN',payload:false});
        dispatch({type:'LoginToken',payload:''});
        dispatch({type:'USER_DATA',payload:''});
    }
}
