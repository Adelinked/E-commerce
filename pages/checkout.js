import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showUserLogin } from "../store/actions/userAction";
import { Nav } from "../components/Cart/Nav";
import getStripe from "../lib/get_stripe";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAllCart } from "../store/actions/cartAction";
const Checkout = () => {
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const { session_id, cancel } = query;
    if (session_id) {
      setSuccess(true);
      dispatch(setAllCart([]));
    }
    if (cancel) {
      alert("Payment cancelled try again later!");
    }
  }, [query]);
  const { data: session, status } = useSession();
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const loading = status === "loading";
  let userName, userImg;
  if (session) {
    userName = session.user.name ?? session.user.email;
    userImg = session.user.image;
  }
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const total = parseFloat(
    cart.reduce((prev, curr) => prev + curr.amount * curr.price, 0).toFixed(2)
  );

  const redirectToCheckout = async () => {
    try {
      const {
        data: { id },
      } = await axios.post("/api/checkout_sessions", {
        items: Object.entries(cart).map(([_, { stripApiId, amount }]) => ({
          price: stripApiId,
          quantity: amount,
        })),
      });
      if (id) {
        setRedirect(true);
      }
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      //console.log(error.response.data);
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>E-commerce Checkout</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.checkoutDiv}>
        <div className={styles.loading}>{loading && <CircularProgress />}</div>
        {session && (
          <div className={styles.welcome}>
            <p className={styles.welcome}>Hello, {userName}</p>
            {total > 0 ? (
              <>
                {!success && (
                  <>
                    <p className={styles.welcome}>
                      Your total is: {total}$ <Nav items={cart} />{" "}
                    </p>{" "}
                    <button
                      style={{ marginTop: "10px" }}
                      onClick={redirectToCheckout}
                    >
                      Payment <i className="fa fa-credit-card"></i>
                    </button>
                  </>
                )}
                <p>
                  {redirect && "... Redirecting to Stripe.com for payment "}
                </p>
              </>
            ) : (
              <>
                {" "}
                {success && (
                  <div className={styles.success}>
                    "Your Payment Was Successful!"{" "}
                    <button
                      onClick={() => {
                        router.push("/products");
                      }}
                      className="button"
                      style={{ marginTop: "10px" }}
                    >
                      Shop more
                    </button>
                  </div>
                )}
                {!success && (
                  <>
                    <p style={{ marginTop: "20px" }}> You cart is empty</p>
                    <button
                      onClick={() => {
                        router.push("/products");
                      }}
                      className="button"
                    >
                      Fill it
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {!session && !loading && (
          <p className={styles.welcome}>
            Please{" "}
            <a
              href="#"
              onClick={() => {
                dispatch(showUserLogin(true));
              }}
              style={{ color: "var(--color-font)" }}
            >
              Sign in
            </a>{" "}
            to continue
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
