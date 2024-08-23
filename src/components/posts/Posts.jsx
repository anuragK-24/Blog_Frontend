import React, { useState, useEffect } from 'react';
import './posts.css';
import Post from '../post/Post';
import axios from 'axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(
        `https://blog-backend-zeta.vercel.app/api/posts?page=${page}&limit=3`
      );
      setPosts((prevPosts) => {
        // Check if the new posts are already in the state
        const newPosts = res.data.posts.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <>
    <div className='posts'>
      {posts.length === 0 && <h1 className='text'>No Blog found</h1>}
      {posts.map((p, key) => (
        <Post post={p} key={key} />
      ))}
      {hasMore && (
          <button className='postsButton' onClick={() => setPage((prevPage) => prevPage + 1)}>
            Load More
          </button>
        )}
    </div>
    </>
  );
}