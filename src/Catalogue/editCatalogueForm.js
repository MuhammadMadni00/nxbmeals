import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "./Catalogue.css";

const EditCatalogueForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("main course");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const catalogueId = useParams()
  const id = catalogueId.id
  const base_uri = `http://localhost:5000/api/catalogues/${id}`;
  const handleImageCompression = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
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
    const compressedImage = await handleImageCompression(image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("image", compressedImage);
    console.log("type:", type);

    try {
      const response = await axios.put(base_uri, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Catalogue edit successfully");
      setSuccess(true);
      setName("");
      setType("main course");
      setPrice("");
      setImage(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };
  useEffect(() => {


    const fetchCatalogue = async () => {
      try {
        // setLoading(true);
        const response = await fetch(base_uri);
        if (!response.ok) {
          throw new Error('Failed to fetch catalogue');
        }
        const data = await response.json();
        setName(data.name);
        setType("main course");
        // let id = useParams()
        // console.log("hellow",id)
        setPrice(data.price);
        setImage(data.image);
        // setCatalogue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    if (id) {
      fetchCatalogue();
    }
  }, [id]);

  return (
    <div className="form-container">
      <div className="card">
        <h2>Edit Catalogue Item</h2>
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
            Edit Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCatalogueForm;
