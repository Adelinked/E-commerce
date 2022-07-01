import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { useLocalStorageValue } from "@mantine/hooks";
import { useAppContext } from "../context";
import Cart from "./Cart/Cart";
import { Nav } from "./Cart/Nav";
import { useDispatch, useSelector } from "react-redux";
import { setAllCart } from "../store/actions/cartAction";
import { UserNav } from "../components/User/UserNav";
import UserLogin from "../components/User/UserLogin";
import { useSession } from "next-auth/react";
import AppLoading from "../components/AppLoading";
import { setAppLoading } from "../store/actions/appAction";
import { useRouter } from "next/router";

export default () => {
  const { data: session } = useSession();

  const cart = useSelector((state) => state.cart);
  const [logged, setLogged] = useState(false);
  const [show, setShow] = useState(true);
  const [scrollpos, setScrollpos] = useState();
  const [themeLocal, setThemeLocal] = useLocalStorageValue({
    key: "theme",
  });
  const [cartLocal, setCartLocal] = useLocalStorageValue({
    key: "cart",
  });
  const dispatch = useDispatch();
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    setGlobalState((themeLocal && themeLocal.theme) ?? "dark-theme");
    dispatch(setAllCart((cartLocal && cartLocal.cart) ?? []));
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    setThemeLocal({ theme: theme });
    setCartLocal({ cart: cart.cart });
  }, [globalState]);

  useEffect(() => {
    setCartLocal({ cart: cart.cart });
  }, [cart]);

  const switchTheme = () => {
    setGlobalState((oldTheme) =>
      oldTheme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };
  let theme = globalState;
  const titleTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function cleanup() {
      document.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = (e) => {
    const currentScrollPos = window.scrollY;

    if (scrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = 0;
    } else {
      document.getElementById("navbar").style.top = "-12vh";
    }
    setScrollpos(currentScrollPos);
  };
  const openVertNav = () => {
    if (show) {
      document.getElementById("vertNavbar").style.right = "0";
      document.getElementById("navbar").style.top = "-12vh";
    } else {
      document.getElementById("vertNavbar").style.right = "100%";
      document.getElementById("navbar").style.top = "0";
    }

    setShow((show) => !show);
  };
  const { query } = useRouter();
  useEffect(() => {
    dispatch(setAppLoading(false));
  }, [query]);

  const { loading } = useSelector((state) => state.app);

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        <span
          className={styles.themeSwitch}
          title={`Switch to ${titleTheme}`}
          onClick={switchTheme}
        >
          {theme === "light-theme" ? (
            <i className="fa fa-moon-o"></i>
          ) : (
            <i className="fa fa-sun-o"></i>
          )}
        </span>
        <Link href="/">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Go to Home page"
          >
            Home
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            About
          </a>
        </Link>
        <Link href="/products">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Go to products page"
          >
            Products
          </a>
        </Link>
        {session && (
          <Link href="/checkout">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="Go to checkout page"
            >
              Checkout
            </a>
          </Link>
        )}
        <div className={styles.cartLogOpen}>
          <Nav items={cart.cart} />
          <div className={styles.loginContainer}>
            <UserNav />
          </div>

          <span className={styles.openNav} onClick={openVertNav}>
            <i className="fa fa-bars"></i>
          </span>
        </div>

        <Cart />
      </nav>
      <nav className={styles.vertNavbar} id="vertNavbar">
        <span className={styles.closeNav} onClick={openVertNav}>
          <i className="fa fa-close"></i>
        </span>
        <span
          className={styles.themeSwitch}
          title={`Switch to ${titleTheme}`}
          onClick={switchTheme}
        >
          {theme === "light-theme" ? (
            <i className="fa fa-moon-o"></i>
          ) : (
            <i className="fa fa-sun-o"></i>
          )}
        </span>
        <div className={styles.loginContainer}>
          <UserNav />
        </div>
        <Link href="/">
          <a
            style={{ marginTop: "30px" }}
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Go to home page"
          >
            Home
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Go to about page"
          >
            About
          </a>
        </Link>
        <Link href="/products">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Go to products page"
          >
            Products
          </a>
        </Link>
        {session && (
          <Link href="/checkout">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="Go to checkout page"
            >
              Checkout
            </a>
          </Link>
        )}
      </nav>
      <UserLogin />
      {loading && <AppLoading />}
    </>
  );
};
