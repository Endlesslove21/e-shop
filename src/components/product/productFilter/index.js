import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedMaxPrice,
  selectedMinPrice,
  selectedProducts,
} from "../../../redux/slice/productSlide";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const products = useSelector(selectedProducts);
  const minPrice = useSelector(selectedMinPrice);
  const maxPrice = useSelector(selectedMaxPrice);

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(maxPrice);

  const dispatch = useDispatch();
  //create list of categoru
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [brand, dispatch]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, price]);

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat) => {
          return (
            <button
              key={cat}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250;{cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          name="brand"
        >
          {allBrands.map((brand) => (
            <option value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <h4>Price</h4>
      <p>{`$${price}`}</p>
      <div className={styles.price}>
        <input
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <br />
      <button onClick={clearFilter} className="--btn --btn-danger">
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
