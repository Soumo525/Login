import React, { useEffect, useRef } from "react";
import { useAuth } from "../utility/Auth";
import { storage } from "../appwriteConf";
import conf from "../conf/conf";

const Profile = () => {
  const newImg = useRef(null);
  const { uploadImage, listImage , imgListNew} = useAuth();

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

  return (
    <>
      <div className="container">
        <div className="login-register-container">
          {/* Render the list of images here */}


          <form ref={newImg} onSubmit={handleSubmit}>
            <div className="form-field-wrapper">
              <label>Upload File</label>
              <input type="file" name="filename" />
            </div>
            <div className="form-field-wrapper">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
         
        </div>
      </div>
      <h2>image list</h2>
        <div className="container-xxl d-flex flex-warp justify-content-start">
          {imgListNew && imgListNew.map((image) => (
            <div className="card col-sm-3 col-xl-3" key={image.$id}>
              <img
                className="card-img-top"
                src={storage.getFilePreview(conf.appwriteBucketId,image.$id)}
                alt="img"
              />
            </div>
          ))}
        </div>
    </>
  );
};


export default Profile;
