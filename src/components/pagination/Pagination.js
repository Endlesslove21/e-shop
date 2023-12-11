import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  //Limit the page Numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li>Prev</li>

      {pageNumbers.map((number) => {
        return <li key={number}>{number}</li>;
      })}

      <li>Next</li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span> of </span>
        <b>{`${Math.ceil(totalProducts / productPerPage)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
