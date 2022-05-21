import { useState, useEffect } from "react";

import styles from "./ProductDetails.module.css";
import { addProduct } from "../store/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "./Cart/Nav";
import { useLocalStorageValue } from "@mantine/hooks";

export const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { products, current } = useSelector((state) => state.products);
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const [product, setproduct] = useState(
    products[current - 1] ?? currProdLocal.currProd
  );
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);

  //let product = products[current - 1] ?? currProdLocal.currProd;
  //const prodId = currProdLocal.currProd && currProdLocal.currProd.id;
  /* 
  const getProduct = async () => {
    const url = `https://fakestoreapi.com/products/${prodId}`;
    const data = await axios.get(url);
    //dispatch(setProducts(data.data));
    product = data.data;
    console.log(product);
  };
  if (!product) {
    getProduct();
  }*/

  const { title, image, description, price, rating, category, id } = props;
  return (
    <div className={styles.productDetails}>
      <div className={styles.prodImgDiv}>
        <img className={styles.image} src={image} alt={title}></img>
      </div>
      <div className={styles.prodTitleDiv}>
        <h2 className={styles.title}>{title}</h2>
        <p>Category: {category}</p>
        <p>
          Rating: {rating && rating.rate} ({rating && rating.count} custumer
          reviews)
        </p>
        <span className={styles.price}>${price}</span>
        <p>{description}</p>
        <div className={styles.quantityDiv}>
          <span style={{ fontSize: "2.2rem" }}>
            <span
              style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={() => {
                setQuantity((qt) => (qt == 0 ? 0 : qt - 1));
              }}
            >
              -
            </span>
            {quantity}
            <span
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => {
                setQuantity((qt) => (qt == 100 ? 100 : qt + 1));
              }}
            >
              +
            </span>
          </span>

          <button
            disabled={disable}
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setDisable(true);
              dispatch(
                addProduct({
                  ...props,
                  img: image,
                  amount: quantity,
                })
              );
              setTimeout(() => {
                setDisable(false);
              }, 1000);
            }}
          >
            Add to cart
          </button>

          <div
            style={{
              color: "var(--color-font)",
              height: "50px",
              marginTop: "10px",
            }}
          >
            {disable && <Nav items={cart.cart} />}
          </div>
        </div>
      </div>
    </div>
  );
};
