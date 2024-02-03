import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../utility/Auth";
import conf from "../conf/conf";
import {} from 'appwrite';
const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setContentStatus] = useState("active");
  const { addToDataBase, getPosts } =  useAuth();
  const [posts, setPosts] = useState([]);

//

useEffect(() => {
  // Fetch posts when the component mounts
  fetchPosts();
}, []);

const fetchPosts = async () => {
  try {
    const response = await getPosts();
    if (response) {
      // Update the state with the fetched posts
      setPosts(response.documents);
      console.log(response.documents);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};





//

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Status",  status);
    addToDataBase({ title, content, status });
    // Clear the input fields after submission
    setTitle("");
    setContent("");
    setContentStatus("active");
    fetchPosts();
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
            <select value={status}
            onChange={(e)=>{setContentStatus(e.target.value)}} 
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
            </tr>
        </thead>
        <tbody>
            {/* Map through the posts and render each row */}
            { posts && posts.map((post) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;