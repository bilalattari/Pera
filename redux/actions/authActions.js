/* eslint-disable */

const loginUser = (user) =>{
    return { 
        type : "LOGIN_USER",
        user
    }
} 

const logoutUser = (user) =>{
    return { 
        type : "LOGOUT_USER",
        user
    }
} 

const emptyUser = (data) =>{
    return { 
        type : "EMPTY_USER",
        data
    }
} 

export {
    loginUser,
    logoutUser,
    emptyUser
}