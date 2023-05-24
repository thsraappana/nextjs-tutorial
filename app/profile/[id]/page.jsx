"use client"

import  {useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/profile';

function UserProfile() {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const userId = searchParams.get('id');
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`);
          const data = await response.json();
          setPosts(data);
        }
    
        fetchPosts();
      }, [])
   
    return (
        <Profile
            name={userName}
            desc=""
            data={posts}
            handleEdit={() => {}}
            handleDelete={() => {}}
        />
    )
}

export default UserProfile