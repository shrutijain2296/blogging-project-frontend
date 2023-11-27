// fetch all our blogs , fetch it and display in form of card
import React, {useState, useEffect} from 'react'
import BlogCard from '../components/Blogs/BlogCards';
import axios from "axios";

function HomePage() {

//  API call
  const [homepageBlogs, setHomepageBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
        window.location.href = "/login";
    }else{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
            headers: {
             "x-acciojob": token,      
            },
        })
        .then((res) => {
            if(res.status === 200){
                setHomepageBlogs(res.data.data);
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
        <h1 style = {{"margin": "2rem"}}>Homepage</h1>
        {homepageBlogs?.map((blog) => (
            <BlogCard blogData={blog} homepage={true}/>
        ))}
    </div>
  )
}

export default HomePage