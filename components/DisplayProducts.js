import { useDispatch, useSelector } from "react-redux";
import { setProductsDisplay } from "../store/actions/productsAction";
import styles from "../styles/Products.module.css";
import { FaWindows, FaList } from "react-icons/fa";
export default () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.products);
  return (
    <div style={{ marginTop: "5px" }}>
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
        <FaWindows />
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
        <FaList />
      </span>
    </div>
  );
};
