import React from 'react';

// On déstrucutre l'objet pour éviter de répéter props
const PostCard = ({ post }) => {
    return (
        <div className="postCard">
            <div className="userContent">{ post.text }</div>
        </div>
    );
};

export default PostCard;