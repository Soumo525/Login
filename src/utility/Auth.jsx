// import { ID, Query } from "appwrite";
// import { createContext, useContext } from "react";
// import { useState, useEffect } from "react";
// import { account, storage, database } from "../appwriteConf";
// import { useNavigate } from "react-router-dom";
// import conf from "../conf/conf";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true); // Fixed typo in setLoadng
//   const [user, setUser] = useState({ id: null }); // Include the user ID in the state




//   useEffect(() => {
//     checkUser();
    
//     // setLoadng(false); // This line is commented out, was it intentional?
//   }, []);

//   const loginUser = async (userInfo) => {
//     try {
//       let response = await account.createEmailSession(
//         userInfo.email,
//         userInfo.password
//       );
//       let accountDetails = await account.get();
//       setUser(accountDetails);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const logoutUser = async (userInfo) => {
//     try {
//       await account.deleteSession('current'); // Make sure to handle errors appropriately
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const checkUser = async () => {
//     try {
//       let check = await account.get();
//       setUser(check);
//     } catch (error) {
//       console.error("Error checking user:", error);
//     }
//     setLoading(false);
//   };
  

//   const addNewUser = async (userInfo) => {
//     setLoading(true);
//     try {
//         let response = await account.create(ID.unique(), 
//         userInfo.email, 
//         userInfo.password1, 
//         userInfo.name);
//         await account.createEmailSession(userInfo.email, userInfo.password1);
//         let accountDetails = await account.get();
//         setUser(accountDetails);
//         navigate('/');
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false);
//   };

//   // ...

//   const uploadImage = async (file) => {
//     console.log('Received file:', file);
   
//     setLoading(true);
//     try {
//       if (!file) {
//         console.error('No file selected');
//         setLoading(false);
//         return;
//       }

//       // Additional logging to ensure the file parameter is a File object
//       console.log('File type:', Object.prototype.toString.call(file));

//       const img = await storage.createFile(
//         conf.appwriteBucketId,
//         ID.unique(),
//         file); // Replace with your actual bucket ID
//       console.log('Image uploaded successfully:', img);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//     setLoading(false);
//   };
  

// // ...

// const [imgListNew, setImageListNew] = useState([])
// const listImage =async() => {
//   try {
//     const img = await storage.listFiles(
//       conf.appwriteBucketId
//     )
//     setImageListNew(img.files)
//     console.log("images " ,img.files)
//     console.log(imgListNew);
//   } catch (error) {
//     console.error('error in the list' ,error)
//   }
// }

// /// Delete Image from AppWrite Bucket


// const deleteImage = async (fileId) => {
//   try {
//     await storage.deleteFile(
//       conf.appwriteBucketId, fileId)
//       setImageListNew((prevList) => prevList.filter((image) => image.$id !== fileId));
//   } catch (error) {
//     console.error(error);
//   }
// }

// /// dataBase 
// const addToDataBase = async ({ title, content, status }) => {
//   try {
//     const userId = user.$id; // Extract user ID from the state
//     console.log(userId);
//     const data = {
//       title,
//       content,
//       status,
//       userId,
//     };
//     console.log(data);
//     const document = await database.createDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       ID.unique(),
//       data
//     );
//     console.log("Data added to the database:", document);
//   } catch (error) {
//     console.error("Error adding data to the database:", error);
//   }
// };

//   // Fetch Data From Database
//   // queries = [Query.equal("status", "active")]
//   //queries = [Query.select(["title","content", "status","userId" ])]

//   const [postNew, setPostNew] = useState([])
//   const  getPosts = async(queries = [Query.equal("status", "active")]) =>
//   {
//     try {
//         const dataBasePost =  await database.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             queries,
            

//         )
//         setPostNew(dataBasePost.documents)
//     } catch (error) {
//         console.log("Appwrite serive :: getPosts :: error", error);
//         return false
//     }
// }

// // delete data


// const deleteDatabse = async (documentId) => {
//   if (!documentId) throw new Error('No Document Id provided');
// try {
//   let res = await database.deleteDocument(conf.appwriteDatabaseId,
//     conf.appwriteCollectionId,
//     documentId
//     )
//     setPostNew((prevList) => prevList.filter((docId) => docId.$id !== documentId));

// } catch (error) {
//   console.error(error);
// }
  
// }
//  // Update Post

//  const updateData = async (updateId, { title, content, status }) => {
//   try {
//     // Fetch the existing document data
//     const existingDocument = await database.getDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       updateId
//     );

//     // Merge the existing data with the updated values
//     const updatedDocumentData = {
//       title: title || existingDocument.title,
//       content: content || existingDocument.content,
//       status: status || existingDocument.status,
//     };

//     // Perform the update
//     const updatedDocument = await database.updateDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteCollectionId,
//       updateId,
//       updatedDocumentData
//     );

//     return updatedDocument;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//   const data = {
//     user,

//     loginUser,
//     logoutUser,
//     checkUser,
//     addNewUser,
//     uploadImage,
//     listImage,
//     imgListNew,
//     deleteImage,
//     addToDataBase,
//     getPosts,
//     postNew,
//     deleteDatabse,
//     updateData
//   };

//   return (
//     <AuthContext.Provider value={data}>
//       {loading ? <p>OK</p> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// export default AuthContext;






import { ID, Query } from "appwrite";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { account, storage, database } from "../appwriteConf";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
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
      console.error("Error logging in:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkUser = async () => {
    try {
      let check = await account.get();
      setUser(check);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
      await account.createEmailSession(userInfo.email, userInfo.password1);
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.error('Error creating new user:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    setLoading(true);
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const img = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      console.log('Image uploaded successfully:', img);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const [imgListNew, setImageListNew] = useState([]);

  const listImage = async () => {
    try {
      const img = await storage.listFiles(
        conf.appwriteBucketId
      );
      setImageListNew(img.files);
      console.log("Images:", img.files);
    } catch (error) {
      console.error('Error listing images:', error);
    }
  };

  const deleteImage = async (fileId) => {
    try {
      await storage.deleteFile(
        conf.appwriteBucketId, fileId
      );
      setImageListNew((prevList) => prevList.filter((image) => image.$id !== fileId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const addToDataBase = async ({ title, content, status }) => {
    try {
      const userId = user.$id;
      const data = {
        title,
        content,
        status,
        userId,
      };
      const document = await database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        data
      );
      console.log('Data added to the database:', document);
    } catch (error) {
      console.error('Error adding data to the database:', error);
    }
  };

  const [postNew, setPostNew] = useState([]);

  const getPosts = async (queries = [Query.equal("status", "active")]) => {
    try {
      const dataBasePost = await database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      setPostNew(dataBasePost.documents);
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
    }
  };

  const deleteDatabse = async (documentId) => {
    if (!documentId) throw new Error('No Document Id provided');
    try {
      let res = await database.deleteDocument(conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      setPostNew((prevList) => prevList.filter((docId) => docId.$id !== documentId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (updateId, { title, content, status }) => {
    try {
      const existingDocument = await database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        updateId
      );

      const updatedDocumentData = {
        title: title || existingDocument.title,
        content: content || existingDocument.content,
        status: status || existingDocument.status,
      };

      const updatedDocument = await database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        updateId,
        updatedDocumentData
      );

      return updatedDocument;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
    getPosts,
    postNew,
    deleteDatabse,
    updateData
  };

  return (
    <AuthContext.Provider value={data}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
