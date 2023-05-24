"use client"

import { useState, useEffect } from 'react'
import useDebounce from '@utils/UseDebounce'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // preserve original state with all posts
  const [postsLoaded, setPostsLoaded] = useState(false);

  useDebounce(() => {
      if (postsLoaded) filterFunction()
    }, [searchText], 1000
  );

  const filterFunction = () => {
    if (!searchText.length) {
      setPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter(post => post.tag === searchText || post.prompt.includes(searchText) || post.creator.username === searchText);
      setPosts(filteredPosts);
    }
  }

  const handleSearchChange = (e) => setSearchText(e.target.value);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setAllPosts(data);
      setPostsLoaded(true)
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(e) => setSearchText(e)}
      />
    </section>
  )
}

export default Feed