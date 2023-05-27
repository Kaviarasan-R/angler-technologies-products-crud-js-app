/* React Libraries */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/* Services */
import {
  getProduct,
  searchProduct,
  reset,
} from "../features/auth/productSlice";

/* Components */
import NavBar from "../components/NavBar";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductCard from "../components/ProductCard";

/* Styles */
import "../assets/styles/Products.css";
import FilterBox from "../components/FilterBox";
import SearchBox from "../components/SearchBox";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* States */
  const [pageNumber, setPageNumber] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [sortPage, setSortPage] = useState(1);
  const [category, setCategory] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { productData, loading, error, hasMore } = useSelector(
    (state) => state.product
  );

  const isFirstRender = useRef(true);

  /* UseEffect for redirect users if they're not logged in */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (searchWord == "") {
      const productParams = { pageNumber, sortPage, category };
      dispatch(getProduct(productParams));
    } else {
      const productParams = { pageNumber, searchWord };
      dispatch(searchProduct(productParams));
    }
  }, [user, pageNumber, sortPage, category]);

  useEffect(() => {
    dispatch(reset());
    setPageNumber(1);
  }, [searchWord, sortPage, category]);

  const handleSearch = (searchText) => {
    if (searchText != searchWord) {
      setSearchWord(searchText);
    }
  };

  const handleFilter = (sortOption, selectedCategory) => {
    if (Number(sortOption) != sortPage) {
      setSortPage(Number(sortOption));
    }
    if (category != selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  /* Refs & Callbacks for getting last page number */
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <NavBar />
      <div className='product-page'>
        <h1 style={{ marginBottom: "1.5rem" }}>Products</h1>
        <div className='product-container'>
          <div className='product-filter'>
            <SearchBox onSearch={handleSearch} />
            <FilterBox onFilter={handleFilter} />
          </div>
          <div className='product-list' style={{ width: "100%" }}>
            {loading && <ProductSkeleton cards={8} />}
            {productData &&
              productData.flat().map((product, index) => {
                if (productData.length === index + 1) {
                  return (
                    <ProductCard
                      ref={lastProductElementRef}
                      product={product}
                      key={index}
                    />
                  );
                } else {
                  return <ProductCard product={product} key={index} />;
                }
              })}
            <div>{error && "ERROR"}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
