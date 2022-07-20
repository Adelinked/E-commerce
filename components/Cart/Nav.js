import { useState } from "react";
import styles from "./cartStyle.module.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { setCart, showCartNav } from "../../store/actions/cartAction";
import { FaShoppingCart } from "react-icons/fa";

export const Nav = (props) => {
  const dispatch = useDispatch();

  const openCartNav = () => {
    dispatch(showCartNav(true));
  };
  const count = props.items.reduce((prev, curr) => prev + curr.amount, 0);
  return (
    <div
      className={styles.cartIcon}
      onClick={openCartNav}
      style={{ color: count > 0 && `var(--color-font)` }}
    >
      <span className={styles.count}> {count} </span>
      <span style={{ fontSize: "3rem" }}>
        <FaShoppingCart />
      </span>
    </div>
  );
};
