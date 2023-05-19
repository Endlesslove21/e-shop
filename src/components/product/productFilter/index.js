import React from "react";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        <button>All</button>
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand">
          <option value="all">All</option>
        </select>
      </div>

      <h4>Price</h4>
      <p>1500</p>
      <div className={styles.price}>
        <input type="range" name="price" min="10" max="1000" />
      </div>
      <br />
      <button className="--btn --btn-danger">Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
