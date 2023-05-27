/* React Libraries */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

/* Importing redux reducers */
import { forgotPassword, reset } from "../features/auth/authSlice";

/* Components */
import Card from "../components/AuthCard";
import NavBar from "../components/NavBar";

/* Styles */
import "../assets/styles/Login.css";

const ForgotPassword = () => {
  // Initialize
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use state initialize
  const [formData, setFormData] = useState({
    email: "",
  });

  // Get formdata from state
  const { email } = formData;

  // Get redux states by slice name
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Use effect runs whenever [redux-user, redux-isError, redux-isSuccess, redux-message, dispatch, navigate]
  useEffect(() => {
    // If error happens, notify with error message
    if (isError) {
      toast.error(message);
    }

    // If success or user object is not null navigate to main page
    if (isSuccess || user) {
      navigate("/products");
    }

    // Call redux-reducer reset() to reset states
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Everytime changes, it updates state
  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = email;
    // Calling register async thunk api
    dispatch(forgotPassword(userData));
  };

  return (
    <>
      <NavBar />
      <Card>
        <h1 className='title'>Forgot Password</h1>
        <p className='subtitle'>Please enter registered mail id!</p>
        <form onSubmit={handleSubmit}>
          <div className='inputs_container'>
            <input
              type='text'
              placeholder='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <input type='submit' value='Get Mail' className='login_button' />
        </form>
        <div className='link_container'>
          <Link to='/register' className='small'>
            Don't have an account?
          </Link>
        </div>
      </Card>
    </>
  );
};

export default ForgotPassword;
