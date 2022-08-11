import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard/PostCard';
import Header from '../components/Header/Header'
const axios = require('axios')

const Feed = () => {
    const [postData, setPostData] = useState([])

    useEffect(() => {
        axios.get('/post').then((res) => { setPostData(res.data) })
    }, [])

    return ( 
        <div>
            <Header />
            <div className="postContainer">
                <div className="listing-postCard">
                    {postData
                    .map(postDateString => ({ ...postDateString, date: new Date(postDateString.uploadTime) }))
                    .sort((a, b) => a.date > b.date ? -1 : 1)
                    .map((post) => (
                        <PostCard key={post._id} post={ post } />
                    ))}
                </div>
            </div>
        
        </div>
    );
};

export default Feed