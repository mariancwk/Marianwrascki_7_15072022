import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SendPost.css'
import ApiAlerts from '../ApiAlerts/ApiAlerts';
import { setInputHeight } from '../../lib/setInputHeight';
import { useDispatch } from 'react-redux';
import { UPDATE_FEED } from '../../redux/reducers/updateFeed';

const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;
let isSending = false

const SendPost = () => {
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [textarea, setTextarea] = useState('')
    const [textareaHeight, setTextareaHeight] = useState(60)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        isSending = true
        const formData = new FormData(e.target)

        formData.append('uploadTime', Date.now())
        formData.append('textareaHeight', textareaHeight)
        
        try {
          await axios({
              method: "post",
              url: "/post",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
          })
          await axios.get('/post').then((res) => { 
            dispatch({ type: UPDATE_FEED, payload: res.data })
            isSending = false
         }) 

        } catch (error) {
            console.log(error)
            isSending = false
            return setErrorMsg(error.response.data.error.errors.text.message || 'Erreur, veuillez réessayer')
          }
    }

    return (
        <div className='post-component' >
          <h3>Créer une publication</h3>
            <form name='post-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <textarea 
                name='text'
                type="text" 
                placeholder="qu'est ce qu'on a ?"
                onChange={(e) => {
                  setTextarea(e.target.value)
                  setInputHeight(e, '60px')
                  setTextareaHeight(e.target.scrollHeight)
                }}
                />
                
                <div className="post-img--preview">
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
                    
                  <label htmlFor="file" className="imgBtn"><img src="../images/uploadimg.png" alt="" /></label>
                    <input 
                    id="file"
                    name='image'
                    type='file' 
                    onChange={changeHandler}
                    accept="image/*"
                    className='post-options--imgInput' 
                    />
                </div>
                
                <button type='submit' className={`btn btn-primary ${isSending ? "loading" : ""}`}  disabled={!textarea} >Publier !</button>
            </form>

            <ApiAlerts errorMsg={errorMsg} />
        </div>
    );
};

export default SendPost;