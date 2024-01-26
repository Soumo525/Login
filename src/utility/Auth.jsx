import { createContext, useContext } from "react";
import { useState, useEffect } from "react";



const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [loading, setLoadng] = useState(true)
    const [user , setUser] = useState(false)

    useEffect(() => {
      setLoadng(false)
 
    }, [])
    

    const loginUser = () => {

    }

    const logoutUser =() => {

    }

    const data = {
        user,
        loginUser,
        logoutUser
        
    }
    return (
        <AuthContext.Provider value={data}>
        {loading ? <p>OK</p> : children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}
export default AuthContext;