import styles from "./cartStyle.module.css";
import Image from "next/image";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
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
          <div className={styles.imgDiv}>
            {" "}
            <Image
              src={item.img}
              alt={item.title}
              width="100px"
              height="133px"
            />
          </div>
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
          <div className={styles.amount}>
            <FaArrowCircleUp
              style={{ cursor: "pointer" }}
              onClick={() => handleInc(item.id)}
            />
            {item.amount}
            <FaArrowCircleDown
              style={{ cursor: "pointer" }}
              onClick={() => handleDec(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
