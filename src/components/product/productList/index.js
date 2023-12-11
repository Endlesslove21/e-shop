import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search";
import ProductItem from "../productItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilterProducts,
} from "../../../redux/slice/filterSlice";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlide";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const dispatch = useDispatch();
  const filterProducts = useSelector(selectFilterProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(2);

  //get current product
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS({
        products,
        sort,
      })
    );
  }, [dispatch, products, sort]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color="orangered"
            onClick={() => setGrid(false)}
          />

          <p>
            <b>{filterProducts.length}</b> Products found.
          </p>
        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} product={product} grid={grid} />
                </div>
              );
            })}
          </>
        )}
      </div>

      <Pagination
        productPerPage={productPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filterProducts.length}
      />
    </div>
  );
};

export default ProductList;
