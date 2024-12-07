import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import M from 'materialize-css';
import './Signup.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); 
  const [imageURL, setImageURL] = useState(''); 

  const submitPost = () => {
    
    if (!title || !content || !image) {
      M.toast({ html: 'Please fill in all fields.', classes: '#d32f2f red darken-2' });
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'instagram-app');
    formData.append('cloud_name', 'myinstagramapp');

    
    fetch('https://api.cloudinary.com/v1_1/myinstagramapp/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          setImageURL(data.secure_url);

         
          fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              content,
              image: data.secure_url, 
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.error) {
                M.toast({ html: result.error, classes: '#d32f2f red darken-2' });
              } else {
                M.toast({ html: 'New post added!', classes: '#00e676 green accent-3' });
                navigate('/'); 
              }
            })
            .catch((error) => {
              console.error('Error creating post:', error);
              M.toast({ html: 'Something went wrong. Please try again.', classes: '#d32f2f red darken-2' });
            });
        } else {
          M.toast({ html: 'Image upload failed. Please try again.', classes: '#d32f2f red darken-2' });
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        M.toast({ html: 'Image upload failed. Please try again.', classes: '#d32f2f red darken-2' });
      });
  };

  return (
    <div>
      <div className="card post-container">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload the image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="waves-effect waves-light btn #64b5f6 blue darken-1"
          onClick={submitPost}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
