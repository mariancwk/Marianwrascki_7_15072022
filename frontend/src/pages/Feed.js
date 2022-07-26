import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import Header from '../components/Header'
const axios = require('axios')

const Feed = () => {
    const [postData, setPostData] = useState([])

    useEffect(() => {
        axios.get('/post')
        .then((res) => { setPostData(res.data) })
    }, [])

    return ( 
        <div>
            <Header />
            <div className="postContainer">
                <div className="postCard">
                    {postData.map((post) => (
                        <PostCard key={post._id} post={ post } />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed