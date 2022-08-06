import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SendPost.css'

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const userJSON = localStorage.getItem('user')
const user = JSON.parse(userJSON)

const SendPost = () => {
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(null)

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
          alert("Image only");
          return;
        }
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
        const formData = new FormData(e.target)

        formData.append('userId'  , user.id)
        formData.append('uploadTime', Date.now())
        
        try {
            const res = await axios({
                method: "post",
                url: "/post",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })

            return console.log(res)
        } catch (error) {
            return console.log(error)
        }
    }

    return (
        <div className='post-component' >
            <form name='post-form' onSubmit={handleSubmit} enctype="multipart/form-data">
                <textarea 
                name='text'
                type="text" 
                placeholder="qu'est ce qu'on a ?"
                />
                <label for="file" class="label-file btn btn-outline btn-secondary">Choisir une image</label>
                <div className="post-options">
                    <input 
                    id="file"
                    name='image'
                    type='file' 
                    onChange={changeHandler}
                    accept="image/*"
                    className='post-options--img' 
                    />
                </div>
                
                <div className="post-img--preview">
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                        {
                            <img src={fileDataURL} alt="preview" />
                        }
                        </p> : null
                    }
                </div>
                
                <button type='submit' className='btn btn-primary' >Submit</button>
            </form>
        </div>
    );
};

export default SendPost;