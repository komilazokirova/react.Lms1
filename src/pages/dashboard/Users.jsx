// import { useState } from "react";

// const [users, setUsers]=useState([]);
// const [email, setEmail]=useState("")

// async function getPosts() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");

//    setUsers(response.data);
//   } catch (error) {
    
//     console.log("Xatolik", error.message);
//   }
// }

// getPosts();

// import React, { useEffect, useState } from 'react'

// const Users = () => {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//         try {
//             const response = await axios(
//                 "https://jsonplaceholder.typicode.com/posts"
//             );
//             setUsers(response.data)
//         } catch (error) {
//             console.log(error.message);
            
//         }
//     },[])
//   return (
//     <div>Users</div>
//   )
// }

// export default Users

import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setPosts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;