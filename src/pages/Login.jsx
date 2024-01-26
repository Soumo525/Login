import React, { useEffect,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utility/Auth'

const Login = () => {

  const navigate = useNavigate()
  const {user,loginUser} =  useAuth()

  const loginFrom = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  },[])

  const handleSubmit = (e) =>{
     e.preventDefault()
     const email = loginFrom.current.email.value
     const password = loginFrom.current.password.value

     const userInfo = {
      email,
      password
     }
     loginUser(userInfo)
     
  }
  return (
    <div className="container">
        <div className="login-register-container">
          <form ref={loginFrom} onSubmit={handleSubmit}>

            <div className="form-field-wrapper">
                <label>Email:</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Enter email..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter password..."
                  />
            </div>


            <div className="form-field-wrapper">
    
                <input 
                  type="submit" 
                  value="Login"
                  className="btn"
                  />

            </div>

          </form>

          <p>Don't have an account? <Link to="/register">Register</Link></p>

        </div>
    </div>
  )
}

export default Login
