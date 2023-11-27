// fetch all our blogs , fetch it and display in form of card
import React, {useState, useEffect} from 'react'
import BlogCard from '../components/Blogs/BlogCards';
import axios from "axios";

function MyBlogs() {

//  API call
  const [myBlogs, setMyBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
        window.location.href = "/login";
    }else{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`, {
            headers: {
             "x-acciojob": token,      
            },
        })
        .then((res) => {
            if(res.status === 200){
                setMyBlogs(res.data.data);
            }
            else{
                alert(res.data.message);
            }
        })
        .catch((err) => {
            alert(err);
        });
    }
   
  }, [token])

  return (
    <div>
        <h1 style = {{"margin": "2rem"}}>My Blogs</h1>
        {myBlogs?.map((blog) => (
            <BlogCard blogData={blog} />
        ))}
    </div>
  )
}

export default MyBlogs