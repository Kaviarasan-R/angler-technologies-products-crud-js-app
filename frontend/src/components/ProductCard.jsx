/* React Libraries */
import React, { forwardRef, useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/* Services */
import { deleteProduct } from "../features/auth/productSlice";

/* Styles */
import "../assets/styles/ProductCard.css";

const ProductCard = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product } = props;
  const [optionsVisible, setOptionsVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleOptionsClick = () => {
    setOptionsVisible(!optionsVisible);
  };

  const handleUpdate = () => {
    const data = { type: "update", prod: product };
    navigate("/add-product", { state: data });
  };

  const handleDelete = () => {
    const data = { productID: product._id, authID: product.author };
    dispatch(deleteProduct(data));
  };

  return (
    <div className='product-card' ref={ref}>
      <img className='avatar' src={product.image.url} alt='product' />
      <div className='info'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{product.name}</h3>
          <MoreVertIcon className='white-icon' onClick={handleOptionsClick} />
          {optionsVisible && (
            <div className='options'>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
        <p>
          {product.description.length > 100
            ? product.description.slice(0, 150) + "..."
            : product.description}
        </p>
      </div>
    </div>
  );
});
export default ProductCard;
