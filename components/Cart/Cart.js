import Head from "next/head";
import Link from "next/link";
import { Item } from "./Item";
import { Nav } from "./Nav";
import { Total } from "./Total";
import { useEffect, useState, useCallback } from "react";
import styles from "./cart.module.css";
import { useDispatch, useSelector, connect } from "react-redux";

import {
  setCart,
  fetchItems,
  showCartNav,
} from "../../store/actions/cartAction";

export default function () {
  const url = "./api/";

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { show } = cart;
  useEffect(() => {
    /// if (count.count === 0) {
    // to fetch data only once
    // dispatch(fetchItems());
    //}
  }, []);

  useEffect(() => {
    if (show) {
      document.getElementById("cartNav").style.left = "0";
    } else {
      document.getElementById("cartNav").style.left = "100%";
    }
  }, [show]);

  return (
    <div className={styles.cartNav} id="cartNav">
      <span className={styles.cartNavTitle}>
        {cart.cart.length > 0 && "Your cart: "}
        <Nav items={cart.cart} />
      </span>
      <span
        className={styles.closeNav}
        onClick={() => {
          dispatch(showCartNav(false));
        }}
      >
        <i className="fa fa-close"></i>
      </span>
      {cart.cart.map((i) => (
        <Item
          key={i.id}
          item={i}
          handleInc={() => dispatch(setCart("INC_ITEM", i.id))}
          handleDec={() => dispatch(setCart("DEC_ITEM", i.id))}
          handleRemove={() => dispatch(setCart("REMOVE_ITEM", i.id))}
        />
      ))}
      {cart.cart.length > 0 && <hr className="hr" />}
      <div className={styles.totalClear}>
        <Total items={cart.cart} />
        {cart.cart.length > 0 && (
          <button
            onClick={() => dispatch(setCart("CLEAR_CART"))}
            className="button"
          >
            Clear cart
          </button>
        )}
      </div>
    </div>
  );
}
