import React, { useEffect, useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // new loading state

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong while fetching the data');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.data.children.map(child => child.data));
        setIsLoading(false); // stop loading after data is fetched
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false); // stop loading if there's an error
      });
  }, []);

  return (
    <div className="container">
      <h1>Posts</h1>
      
      {/* Show loading spinner or message */}
      {isLoading && (
        <div className="loader">
          {/* <p>Loading...</p> */}
        </div>
      )}

      {error && !isLoading && (
        <div className="error-message" style={{ color: 'red', padding: '10px', backgroundColor: '#fdd' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="cards">
        {posts.map((post, index) => (
          <div className="card" key={index}>
            <h2 style={{ backgroundColor: 'teal', color: '#fff', padding: '5px', borderRadius: '5px' }}>
              {post.title}
            </h2>
            <div className="score">Score: {post.score}</div>
            {post.selftext_html && (
              <div className="text" dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
            )}
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="url">
              <button className="btn btn-primary btn-sm">Read More</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
