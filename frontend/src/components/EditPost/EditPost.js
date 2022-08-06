import React, { useState, useEffect } from 'react';

const imageMimeType = /image\/(png|jpg|jpeg)/i

const EditPost = ({ post }) => {
    const [txtValue, setTxtValue] = useState(post.text)
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(post.imageUrl)

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

    return (
        <>
            <form name='post-form' enctype="multipart/form-data">
                <textarea 
                name='text'
                type="text" 
                placeholder="qu'est ce qu'on a ?"
                value={txtValue}
                onChange={(e) => setTxtValue(e.target.value)} />

                <div className="editPost-img">
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                        {
                            <img src={fileDataURL} alt="preview" />
                        }
                        </p> : null
                    }
                </div>

                <label for="file" class="label-file btn btn-outline btn-secondary">Changer l'image</label>
                <input 
                id="file"
                name='image'
                type='file' 
                accept="image/*"
                className='post-options--img' 
                onChange={changeHandler}
                />

                <button type='submit' className='btn btn-primary' >Update</button>
            </form>
        </>
    );
};

export default EditPost;