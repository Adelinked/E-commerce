import Head from "next/head";
import Link from "next/link";
import { Item } from "./Item";
import { Nav } from "./Nav";
import { Total } from "./Total";
import { useEffect, useState, useCallback } from "react";
import styles from "./cartStyle.module.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { useRouter } from "next/router";

import { setCart, showCartNav } from "../../store/actions/cartAction";

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
  const router = useRouter();
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
      {cart.cart.length > 0 && <hr className={styles.hr} />}
      <div className={styles.totalClear}>
        <Total items={cart.cart} />
        {cart.cart.length > 0 && (
          <div className={styles.cartCmd}>
            <button
              onClick={() => dispatch(setCart("CLEAR_CART"))}
              className="button"
            >
              Clear cart
            </button>
            <button
              onClick={() => {
                dispatch(showCartNav(false));
                router.push("/checkout");
              }}
              className="button"
            >
              Checkout <i className="fa fa-credit-card"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
