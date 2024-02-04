import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../utility/Auth";
import conf from "../conf/conf";
import {} from "appwrite";
const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setContentStatus] = useState("active");
  const { addToDataBase, getPosts, deleteDatabse, postNew, updateData } = useAuth();
  const [updateId, setUpdateId] = useState(null);
  //

  //
  useEffect(() => {
    getPosts();
  }, []);

  const handleDeletePost = (documentId) => {
    deleteDatabse(documentId);
  };

  //

  //  // Update 

  const handleUpdate = async (updateId) => {
    try {
      const document = await updateData(updateId, { title, content, status });
      if (document) {
        console.log(document);
  
        // Update the state with existing or updated values
        setTitle(document.title !== "" ? document.title : title);
        setContent(document.content !== "" ? document.content : content);
        setContentStatus(document.status || status);
  
        // Store the updated ID
        setUpdateId(document.$id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateId) {
      // If updateId is set, it means we're updating an existing post
      await updateData(updateId, { title, content, status });
    } else {
      // Otherwise, we're adding a new post
      await addToDataBase({ title, content, status });
    }
    // Clear the input fields after submission
    setTitle("");
    setContent("");
    setContentStatus("active");
    setUpdateId(null); // Reset the updateId
    await getPosts();
  };





  return (
    <>
      <h2 className="text-center">This is Home</h2>
      <div className="container mx-auto p-4">
        <div className="login-register-container bg-white p-4 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="border p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1">Content</label>
              <input
                type="text"
                name="content"
                className="border p-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <select
              value={status}
              onChange={(e) => {
                setContentStatus(e.target.value);
              }}
            >
              <option value="active">Active</option>
              <option value="inActive">Inactive</option>
            </select>
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

      {/* table */}

      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                UserId
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the posts and render each row */}
            {postNew &&
              postNew.map((post) => (
                <tr
                  key={post.$id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {post.title}
                  </td>
                  <td className="px-6 py-4">{post.content}</td>
                  <td className="px-6 py-4">{post.status}</td>
                  <td className="px-6 py-4">{post.userId}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleDeletePost(post.$id);
                        console.log("okkk");
                      }}
                      className="bg-transparent hover:bg-red-500 
                  text-blue-700 font-semibold hover:text-white 
                  py-2 px-4 border border-blue-500 hover:border-transparent
                  rounded"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleUpdate(post.$id);
                        console.log("Update");
                      }}
                      className="bg-transparent hover:bg-red-500 
                  text-blue-700 font-semibold hover:text-white 
                  py-2 px-4 border border-blue-500 hover:border-transparent
                  rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
