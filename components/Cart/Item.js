import "font-awesome/css/font-awesome.min.css";
import styles from "./cart.module.css";
export const Item = ({
  item,
  handleRemove,
  handleInc,
  handleDec,
  handleDecProp,
}) => {
  return (
    <div className={styles.itemsContainer}>
      <div className={styles.items}>
        <div className={styles.item}>
          <img
            style={{ width: "80px", justifyContent: "center" }}
            src={item.img}
          ></img>
          <div className={styles.itemText}>
            <p>{item.title} </p>
            <p>{item.price}$</p>
            <span
              onClick={() => handleRemove(item.id)}
              style={{ fontWeight: "600", cursor: "pointer" }}
            >
              Remove
            </span>
          </div>
        </div>
        <div className={styles.amount}>
          <i
            className="fa fa-arrow-up"
            onClick={() => handleInc(item.id)}
            style={{ cursor: "pointer" }}
          ></i>
          {item.amount}
          <i
            className="fa fa-arrow-down"
            onClick={() => handleDec(item.id)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>
    </div>
  );
};
