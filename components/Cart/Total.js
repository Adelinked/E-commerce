import styles from "./cartStyle.module.css";

export const Total = (props) => {
  const money = parseFloat(
    props.items
      .reduce((prev, curr) => prev + curr.amount * curr.price, 0)
      .toFixed(2)
  );

  return (
    <div className={styles.total}>
      {money > 0 ? <p>Total: {money} $</p> : <p>Your cart is empty!</p>}
    </div>
  );
};
