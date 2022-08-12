import React, { useState, useEffect } from 'react';
import { setInputHeight } from '../../lib/setInputHeight';
import ApiAlerts from '../ApiAlerts/ApiAlerts';
import './EditPost.css'
import { sendModify } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { UPDATE_FEED } from '../../redux/updateFeed';
const axios = require('axios')

const imageMimeType = /image\/(png|jpg|jpeg)/i

const EditPost = ({ post }) => {
    const [txtValue, setTxtValue] = useState(post.text)
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(post.imageUrl)
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch()  

    const changeHandler = (e) => {
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        setErrorMsg('Fichier .png, .jpg, .jpeg, .webp accepté')
        return;
      }
      setErrorMsg('')
      setFile(file);
    }


    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    }, [file]);

    const HandleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)

      try {
        await sendModify(formData, post._id)

        await axios.get('/post').then((res) => { 
          dispatch({ type: UPDATE_FEED, payload: res.data })
       }) 

      } catch (error) {
          console.log(error)
          return setErrorMsg(error.response.data.error.errors.text.message || 'Erreur, veuillez réessayer')  
        }
    }

    return (
        <>
          <h3>Modifier votre post</h3>
            <form name='post-form' enctype="multipart/form-data" onSubmit={HandleSubmit}>
                <textarea 
                name='text'
                type="text" 
                placeholder="qu'est ce qu'on a ?"
                value={txtValue}
                style={{"height": `${post.textareaHeight}px`}}
                onChange={(e) => {
                  setTxtValue(e.target.value)
                  setInputHeight(e, `${post.textareaHeight}px`)}} />

                <div className="editPost-img--preview">
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                        <button 
                          className='btn-ghost' 
                          onClick={() => {
                            document.getElementById('file').value = ""
                            setFileDataURL(null)
                            setFile(null)
                        }} >X</button>
                        {
                            <img src={fileDataURL} alt="preview" />
                        }
                        </p> : null
                    }
                </div>

                <div className="post-options">
                  <span>Ajouter à votre publication</span>

                  <label for="file" class="imgBtn"><img src="../images/uploadimg.png" alt="" /></label>
                  <input 
                  id="file"
                  name='image'
                  type='file' 
                  accept="image/*"
                  className='post-options--imgInput' 
                  onChange={changeHandler}
                  />
                </div>

                <button type='submit' className='btn btn-primary'  >Modifier</button>
            </form>

            <ApiAlerts errorMsg={errorMsg} />
        </>
    );
};

export default EditPost;