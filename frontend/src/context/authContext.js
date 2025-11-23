import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn:false,
    token:"",
    username:"",
    login:()=>{},
    logout:()=>{}
})

export default AuthContext