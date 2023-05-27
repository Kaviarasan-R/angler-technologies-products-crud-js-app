/* React Libraries */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

/* Importing redux reducers */
import {
  addProduct,
  reset,
  updateProduct,
} from "../features/auth/productSlice";

/* Components */
import Card from "../components/AuthCard";
import NavBar from "../components/NavBar";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { type, prod } =
    location.state == null ? { type: null, prod: null } : location.state;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (type === "update") {
      setFormData((prevData) => ({
        ...prevData,
        name: prod.name,
        category: prod.category,
        description: prod.description,
      }));
    }
  }, [type]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form data", formData);
    if (!type && !prod._id) {
      dispatch(addProduct(formData));
    } else {
      const data = {
        id: prod._id,
        authID: prod.author,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };
      dispatch(updateProduct(data));
    }
  };

  return (
    <>
      <NavBar />
      <Card>
        {!type && <h1 className='title'>Add Product</h1>}
        {type && <h1 className='title'>Update Product</h1>}
        <p className='subtitle'>Enter product details</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              name='category'
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value=''>All Categories</option>
              <option value='Electronics'>Electronics</option>
              <option value='Gadgets'>Gadgets</option>
              <option value='Computer'>Computer</option>
              <option value='Clothing'>Clothing</option>
              <option value='Home & Kitchen'>Home & Kitchen</option>
              <option value='Beauty & Personal Care'>
                Beauty & Personal Care
              </option>
              <option value='Health & Fitness'>Health & Fitness</option>
              <option value='Books & Media'>Books & Media</option>
              <option value='Sports & Outdoors'>Sports & Outdoors</option>
              <option value='Toys & Games'>Toys & Games</option>
              <option value='Jewelry & Accessories'>
                Jewelry & Accessories
              </option>
              <option value='Baby & Kids'>Baby & Kids</option>
              <option value='Furniture & Decor'>Furniture & Decor</option>
              <option value='Groceries & Food'>Groceries & Food</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </label>
          <label>
            Image:
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </Card>
    </>
  );
};

export default AddProduct;
