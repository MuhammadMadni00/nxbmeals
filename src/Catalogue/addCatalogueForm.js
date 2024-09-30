import React, { useState } from "react";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import "./Catalogue.css";

const AddCatalogueForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("main course");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const base_uri = "http://localhost:5000/api/catalogues";

  // Function to handle image compression
  const handleImageCompression = async (file) => {
    const options = {
      maxSizeMB: 1, // Max file size in MB
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true,
    };
    try {
      const compressedImage = await imageCompression(file, options);
      return compressedImage;
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compress the image before uploading
    const compressedImage = await handleImageCompression(image);

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("image", compressedImage); // Use compressed image
    console.log("type:",type);

    try {
      const response = await axios.post(base_uri, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Catalogue created successfully");
      setSuccess(true);
      setName("");
      setType("");
      setPrice("");
      setImage(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2>Add New Catalogue Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="form-input"
            >
              <option value="main course">Main Course</option>
              <option value="sides">Sides</option>
              <option value="tandoor">Tandoor</option>
              <option value="cafe">Cafe</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCatalogueForm;
