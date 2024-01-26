import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utility/Auth'



const Register = () => {
const newAddUser = useRef(null)
const {addNewUser} =  useAuth()
const handleNew = (e) =>{
  e.preventDefault()
  const name = newAddUser.current.name.value
  const email = newAddUser.current.email.value
  const password1 = newAddUser.current.password1.value
  const password2 = newAddUser.current.password2.value

  if(password1 !== password2){
    alert('Passwords did not match!')
    return 
  }
  const userInfo = {
   name,
   email,
   password1,
   password2

  }
  addNewUser(userInfo)
  
}
  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={newAddUser} onSubmit={handleNew}>

          <div className="form-field-wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Enter name..."
                  />
            </div>

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
                  name="password1" 
                  placeholder="Enter password..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Confirm Password:</label>
                <input 
                  type="password"
                  name="password2" 
                  placeholder="Confirm password..."
                  />
            </div>


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  />

            </div>

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
  </div>
  )
}

export default Register
