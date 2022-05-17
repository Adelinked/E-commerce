import { useDispatch, useSelector } from "react-redux";
import { setProductsDisplay } from "../store/actions/productsAction";
import styles from "../styles/Products.module.css";
export default () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.products);
  return (
    <div>
      <span
        className={styles.displayBut}
        style={{
          color: display === "0" ? "var(--color-font)" : "",
          fontSize: display === "0" ? "3rem" : "",
        }}
        onClick={() => {
          dispatch(setProductsDisplay("0"));
        }}
      >
        <i className="fa fa-windows"></i>
      </span>
      <span
        className={styles.displayBut}
        style={{
          color: display === "1" ? "var(--color-font)" : "",
          fontSize: display === "1" ? "3rem" : "",
        }}
        onClick={() => {
          dispatch(setProductsDisplay("1"));
        }}
      >
        <i className="fa fa-list"></i>
      </span>
    </div>
  );
};
