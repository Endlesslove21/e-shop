import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlide";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(STORE_PRODUCTS({ products: allProducts }));
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted sucessfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.table}>
        <h2>All Products</h2>

        {!!!products.length ? (
          <p>No Product found</p>
        ) : (
          <table>
            <thead>
              <tr style={{ backgroundColor: "#ccc" }}>
                <th>STT</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>

                    <td>
                      <img src={imageURL} alt={name} style={{ width: "20%" }} />
                    </td>

                    <td width={"20%"}>{name}</td>

                    <td width={"15%"}>{category}</td>

                    <td
                      style={{ fontWeight: "700" }}
                      width={"10%"}
                    >{`$${price}`}</td>

                    <td className={styles.icon} width={"6%"}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp; &nbsp;
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        size={20}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
