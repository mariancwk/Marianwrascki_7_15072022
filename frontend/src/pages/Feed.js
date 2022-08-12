import React, { useEffect } from 'react'
import PostCard from '../components/PostCard/PostCard';
import Header from '../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_FEED } from '../redux/reducers/updateFeed';
const axios = require('axios')

const Feed = () => {
    const dispatch = useDispatch()   
    const postData = useSelector(state => state.posts);

    useEffect(()=> {
        axios.get('/post').then((res) => { 
            dispatch({ type: UPDATE_FEED, payload: res.data })
         }) 
    },[])

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