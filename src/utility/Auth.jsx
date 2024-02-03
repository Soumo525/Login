import { ID, Query } from "appwrite";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { account, storage, database } from "../appwriteConf";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Fixed typo in setLoadng
  const [user, setUser] = useState({ id: null }); // Include the user ID in the state


  

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

  // ...

  const uploadImage = async (file) => {
    console.log('Received file:', file);
   
    setLoading(true);
    try {
      if (!file) {
        console.error('No file selected');
        setLoading(false);
        return;
      }

      // Additional logging to ensure the file parameter is a File object
      console.log('File type:', Object.prototype.toString.call(file));

      const img = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file); // Replace with your actual bucket ID
      console.log('Image uploaded successfully:', img);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setLoading(false);
  };
  

// ...

const [imgListNew, setImageListNew] = useState([])
const listImage =async() => {
  try {
    const img = await storage.listFiles(
      conf.appwriteBucketId
    )
    setImageListNew(img.files)
    console.log("images " ,img.files)
    console.log(imgListNew);
  } catch (error) {
    console.error('error in the list' ,error)
  }
}

/// Delete Image from AppWrite Bucket


const deleteImage = async (fileId) => {
  try {
    await storage.deleteFile(
      conf.appwriteBucketId, fileId)
      setImageListNew((prevList) => prevList.filter((image) => image.$id !== fileId));
  } catch (error) {
    console.error(error);
  }
}

/// dataBase 
const addToDataBase = async ({ title, content, status }) => {
  try {
    const userId = user.$id; // Extract user ID from the state
    console.log(userId);
    const data = {
      title,
      content,
      status,
      userId,
    };
    console.log(data);
    const document = await database.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      data
    );
    console.log("Data added to the database:", document);
  } catch (error) {
    console.error("Error adding data to the database:", error);
  }
};

  // Fetch Data From Database
  const  getPosts = async(queries = [Query.equal("status", "active")]) =>
  {
    try {
        return await database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            

        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
}




  const data = {
    user,

    loginUser,
    logoutUser,
    checkUser,
    addNewUser,
    uploadImage,
    listImage,
    imgListNew,
    deleteImage,
    addToDataBase,
    getPosts
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
