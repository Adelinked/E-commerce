import styles from "../styles/Products.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCurrProduct } from "../store/actions/productsAction";
import { useLocalStorageValue } from "@mantine/hooks";
import { setAppLoading } from "../store/actions/appAction";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
export default function Product(props) {
  const {
    title,
    description,
    image,
    price,
    id,
    num,
    fromIndex = false,
  } = props;
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const dispatch = useDispatch();
  const { products, display } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.app);

  return (
    <div className={styles.productPad}>
      {display === "0" || fromIndex ? (
        <>
          <div className={styles.image}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority={num === 0}
            />
          </div>
          <div className={styles.productTitleDiv}>
            <p
              style={{
                textAlign: "left",
                marginRight: "5px",
                fontSize: "1.4rem",
              }}
            >
              {title}
            </p>
            <p style={{ textAlign: "right" }}> ${price} </p>
          </div>
        </>
      ) : (
        <div className={styles.withDescription}>
          <div className={styles.imageHalf}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority={num === 0}
            />
          </div>
          <div className={styles.description}>
            <div className={styles.productTitleDiv}>
              <p style={{ textAlign: "left" }}>{title}</p>
              <p style={{ textAlign: "right" }}> ${price} </p>
            </div>
            <p className={styles.descriptionText}>{description}</p>
          </div>
        </div>
      )}

      <Link href={`/product/${id}`}>
        <a
          onClick={() => {
            dispatch(setCurrProduct(id));
            dispatch(setAppLoading(true));
            setCurrProdLocal({ currProd: products[id - 1] });
          }}
          title={`product${id}`}
        >
          <span
            className={
              display === "0" || fromIndex
                ? styles.productButton
                : styles.productButtonDet
            }
          >
            <FaEye />
          </span>
        </a>
      </Link>
    </div>
  );
}
