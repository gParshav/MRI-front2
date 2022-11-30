import axios from "axios";
import React from "react";
import ImageUploading from "react-images-uploading";

import "./Upload.css";

function Upload() {
  const [images, setImages] = React.useState(null);
  const maxNumber = 20;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handlekaand = () => {
    axios.post("http://127.0.0.1:5000/mri", {
      images,  
    }).then((result) => {
      console.log(result.data)
    })
  }

  return (
    <div className="Upload2">
      <ImageUploading
        single
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">

            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="300" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {/* <div>Upload2</div> */}
      <button onClick={() => handlekaand()}>Submit</button>
    </div>
  );
}


export default Upload
