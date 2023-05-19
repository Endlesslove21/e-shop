import { useState } from "react";
import styles from "./AddProducts.module.scss";
import Card from "../../card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../../loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedProducts } from "../../../redux/slice/productSlide";

const categories = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Fashion",
  },
  {
    id: 4,
    name: "Phone",
  },
];

const initialState = {
  name: "",
  imageURL: "",
  price: null,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector(selectedProducts);
  const productEdit = products.find((product) => product.id === id);

  const [product, setProduct] = useState(() => {
    const state = detectForm(id, { ...initialState }, productEdit);
    return state;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  //uploading image, set progress upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product upload successfully.");
      setUploadProgress(0);
      setProduct({ ...initialState });
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    //delete pre image when updating new image
    if (product.imageURL !== productEdit.imageURL) {
      const imgRef = ref(storage, productEdit.imageURL);
      deleteObject(imgRef);
    }

    //edit product by id
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: product.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product edited successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name: </label>
            <input
              type="text"
              placeholder="Product name"
              required
              value={product.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image: </label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload completed ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageURL"
                  disabled
                  value={product.imageURL}
                />
              )}
            </Card>

            <label>Product price: </label>
            <input
              type="number"
              placeholder="Product price"
              required
              value={product.price}
              name="price"
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product category: </label>
            <select
              value={product.category}
              onChange={(e) => handleInputChange(e)}
              name="category"
              required
            >
              <option value="" disabled>
                -- choose product category
              </option>

              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>

            <label>Product Company/Brand: </label>
            <input
              type="text"
              placeholder="Product brand"
              required
              value={product.brand}
              name="brand"
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product description: </label>
            <textarea
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              name="desc"
              cols="30"
              rows="10"
              required
            ></textarea>

            <button type="submit" className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
