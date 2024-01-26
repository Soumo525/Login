import {Outlet} from "react-router-dom"
import { Navigate } from "react-router-dom";

export const Private = () => {
    const { user } = false
     return user ? <Outlet /> : <Navigate to = "/login" />

}


//// user na thakly login ay pathiya dyby 