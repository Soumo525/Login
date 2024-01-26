import {  ID } from "appwrite";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { account } from "../appwriteConf";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [loading, setLoadng] = useState(true)
    const [user , setUser] = useState(null)
    
    useEffect(() => {
        checkUser()
      //setLoadng(false)
 
    }, [])
    

    const loginUser = async(userInfo) => {

        try {
            let response = await account.createEmailSession(userInfo.email, userInfo.password);
            let accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    const logoutUser =() => {

    }

    const checkUser = async() => {
        try {
            let check = await account.get()
            setUser(check)
        } catch (error) {
            console.error(error);
        }
        setLoadng(false)
    }

    const data = {
        user,
        loginUser,
        logoutUser,
        checkUser
        
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