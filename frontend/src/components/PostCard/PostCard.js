import React, { useEffect, useState } from 'react';
import { sendDelete, sendLike } from '../../lib/api';
import './PostCard.css'
import EditPostModal from '../Modals/EditPostModal';
import EditPost from '../EditPost/EditPost';
import Like from '../../svg/Like';
import ModifySVG from '../../svg/Modify';
import TrashSVG from '../../svg/Trash';

const likedColor = '#33a867'
const unlikedColor = 'GREY'
const user = JSON.parse(localStorage.getItem('user'))

// On déstrucutre l'objet pour éviter de répéter props.post via feed 
const PostCard = ({ post }) => { 
    const [isOpen, setIsOpen] = useState(false)   
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [svgColor, setSvgColor] = useState(unlikedColor)
    const [nbrLike, setNbrLike] = useState(post.usersLiked.length)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        if (post.usersLiked.includes(user.id)) {
            setSvgColor(likedColor)
            return setIsPostLiked(true)
        }
        return setIsPostLiked(false)
    }, [post.usersLiked])

    useEffect(() => {
        if (user.role === 'admin' || post.userId === user.id) {
           return setIsOwner(true) 
        }
        return setIsOwner(false)
    },[post.userId])

    const HandleLike = async (e) => {
        e.preventDefault()

        if (!isPostLiked) {
            setIsPostLiked(true)
            setSvgColor(likedColor)
            setNbrLike(nbrLike + 1)
            return await sendLike(post._id, 1)
        }
        setIsPostLiked(false)
        setSvgColor(unlikedColor)
        setNbrLike(nbrLike - 1)
        await sendLike(post._id, 0)
    }

    const HandleDelete = async (e) => {
        e.preventDefault()
        try {
            await sendDelete(post._id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="postCard">
            <div className="user-content">
                <div className="user-infos">
                    <div className="avatar-bloc">
                        <img src="../images/avatar.png" alt="avatar" />
                    </div>
                    User
                </div>
                <div className="user-options" 
                style={{display: isOwner ? 'block' : 'none' }}  >
                    <button 
                        className='modify-btn' 
                        onClick={() => {
                            setIsOpen(true)
                            document.body.classList.add('no-scrolling')}} > <ModifySVG /> </button>
                            
                    <button className='delete-btn' onClick={HandleDelete} > <TrashSVG /> </button>
                </div>
            </div>

            <div className="post-content">
                <div className="post-txt">{ post.text }</div>
                <div className="post-img"><img src={ post.imageUrl } alt="" /></div>
                <div className="post-interact">
                    <div className="like-bloc">
                    <button onClick={HandleLike} > <Like fill={svgColor} /> </button>
                    {nbrLike}
                    </div>
                </div> 
            </div>

            <EditPostModal
                open={isOpen} 
                onClose={() => {
                    setIsOpen(false)
                    document.body.classList.remove('no-scrolling')}} >
                        
                <EditPost post={ post }/>
            </EditPostModal>

        </div>
    );
};

export default PostCard;