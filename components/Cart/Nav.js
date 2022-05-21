import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import styles from "./cartStyle.module.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { setCart, showCartNav } from "../../store/actions/cartAction";

export const Nav = (props) => {
  const dispatch = useDispatch();

  const openCartNav = () => {
    dispatch(showCartNav(true));
  };
  const count = props.items.reduce((prev, curr) => prev + curr.amount, 0);
  return (
    <span
      className={styles.cartIcon}
      onClick={openCartNav}
      style={{ color: count > 0 && `var(--color-font)` }}
    >
      <span className={styles.count}> {count} </span>
      <i className="fa fa-shopping-cart" style={{ fontSize: "35px" }}></i>
    </span>
  );
};
