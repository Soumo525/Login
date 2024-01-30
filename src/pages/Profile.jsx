import React, { useEffect, useRef } from "react";
import { useAuth } from "../utility/Auth";
import { storage } from "../appwriteConf";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const newImg = useRef(null);
  const { uploadImage, listImage , imgListNew,deleteImage} = useAuth();

  useEffect(()=> {
    listImage()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fileInput = newImg.current.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      await uploadImage(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = (fileId)  => {
    deleteImage(fileId)
  }
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="login-register-container bg-white p-4 shadow-lg rounded-lg">
          <form
            ref={newImg}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Upload File</label>
              <input
                type="file"
                name="filename"
                className="border p-2"
              />
            </div>
            <div className="flex justify-end">
              <input
                type="submit"
                value="Submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
      <h2 className=" text-center text-2xl font-semibold mt-8">Image List</h2>
                    {/* <div className="container-xxl flex flex-wrap justify-start mt-4">
                      {imgListNew &&
                        imgListNew.map((image) => (
                          <div className="card col-sm-3 col-xl-3 p-4" key={image.$id}>
                            <img
                              className="card-img-top rounded-lg "
                              src={storage.getFilePreview(conf.appwriteBucketId, image.$id)}
                              alt="img"
                              style={{ width: "500px", height: "500px",}}
                            />
                          </div>
                        ))}
                    </div> */}
                    <div className="container-xxl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
                      {imgListNew &&
                        imgListNew.map((image) => (
                          <div key={image.$id} className="bg-white rounded-lg shadow-md p-4">
                            <img
                              className="w-full h-50 sm:h-64 object-contain object-center rounded-md"
                              src={storage.getFilePreview(conf.appwriteBucketId, image.$id)}
                              alt="Image "
                            />
                            {/* Add additional information if needed */}
                            <h2 className="text-lg font-semibold mt-2">Image 1</h2> 
                            <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            dolore eu fugiat. Excepteur sint occaecat 
                
                            </p>
                            <button onClick={() => {handleDelete(image.$id) ,console.log("clck")}}
                            className="bg-transparent hover:bg-red-500 
                            text-blue-700 font-semibold hover:text-white 
                            py-2 px-4 border border-blue-500
                            hover:border-transparent rounded">
                              Delete
                            </button>
                          </div>
                        ))}
                   </div>
    </>
  );
};

export default Profile;