import styles from "../styles/Products.module.css";
import "font-awesome/css/font-awesome.min.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCurrProduct } from "../store/actions/productsAction";
import { useLocalStorageValue } from "@mantine/hooks";

export default function Product(props) {
  const { title, description, image, price, id, fromIndex = false } = props;
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const dispatch = useDispatch();
  const { products, display } = useSelector((state) => state.products);
  return (
    <div className={styles.productPad}>
      {display === "0" || fromIndex ? (
        <>
          <img className={styles.image} src={image} alt={title}></img>
          <div className={styles.productTitleDiv}>
            <h4 style={{ textAlign: "left" }}>{title}</h4>
            <p style={{ textAlign: "right" }}> ${price} </p>
          </div>
        </>
      ) : (
        <div className={styles.withDescription}>
          <img className={styles.imageHalf} src={image} alt={title} />
          <div className={styles.description}>
            <div className={styles.productTitleDiv}>
              <h3 style={{ textAlign: "left" }}>{title}</h3>
              <p style={{ textAlign: "right" }}> ${price} </p>
            </div>
            <p className={styles.descriptionText}>{description}</p>
          </div>
        </div>
      )}

      <Link href={`/product/One?id=${id}`}>
        <a
          onClick={() => {
            dispatch(setCurrProduct(id));
            setCurrProdLocal({ currProd: products[id - 1] });
          }}
        >
          <span
            className={
              display === "0" || fromIndex
                ? styles.productButton
                : styles.productButtonDet
            }
          >
            <i className="fa fa-eye"></i>
          </span>
        </a>
      </Link>
    </div>
  );
}
