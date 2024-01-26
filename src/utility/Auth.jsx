import { ID } from "appwrite";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { account } from "../appwriteConf";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Fixed typo in setLoadng
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    // setLoadng(false); // This line is commented out, was it intentional?
  }, []);

  const loginUser = async (userInfo) => {
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = async (userInfo) => {
    try {
      await account.deleteSession('current'); // Make sure to handle errors appropriately
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const checkUser = async () => {
    try {
      let check = await account.get();
      setUser(check);
    } catch (error) {
      console.error("Error checking user:", error);
    }
    setLoading(false);
  };
  

  const addNewUser = async (userInfo) => {
    setLoading(true);
    try {
        let response = await account.create(ID.unique(), 
        userInfo.email, 
        userInfo.password1, 
        userInfo.name);
        await account.createEmailSession(userInfo.email, userInfo.password1);
        let accountDetails = await account.get();
        setUser(accountDetails);
        navigate('/');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const data = {
    user,
    loginUser,
    logoutUser,
    checkUser,
    addNewUser,
  };

  return (
    <AuthContext.Provider value={data}>
      {loading ? <p>OK</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
