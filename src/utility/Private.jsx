import {Outlet,} from "react-router-dom"
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const Private = () => {
    const { user } = useAuth() 
     return user ? <Outlet /> : <Navigate to = "/login" />

}


//// user na thakly login ay pathiya dyby 