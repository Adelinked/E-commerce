import Head from "next/head";
import Link from "next/link";

import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Products.module.css";
import axios from "axios";
import Product from "../components/Product";
import Sort from "../components/Sort";
import DisplayProducts from "../components/DisplayProducts";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/actions/productsAction";
import { useEffect, useState } from "react";
import Filter from "../components/Filter/Filter";

const Products = (
  {
    /*productsServ*/
  }
) => {
  const dispatch = useDispatch();
  const { products, filter, display } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let controller = new AbortController();

    (async () => {
      setLoading(true);
      const url = "./api";
      const data = await axios.get(url, { signal: controller.signal });
      dispatch(setProducts(data.data));
      setLoading(false);
    })();

    return () => controller?.abort();
  }, []);

  let filtredProducts = [...products];
  const { title, category, price, freeShipping } = filter;
  if (title) {
    filtredProducts = filtredProducts.filter((i) =>
      i.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (category && category.length > 0) {
    filtredProducts = filtredProducts.filter((i) => i.category === category);
  }
  if (price > 0) {
    filtredProducts = filtredProducts.filter((i) => i.price <= price);
  }

  if (freeShipping) {
    filtredProducts = filtredProducts.filter((i) => i.freeShipping === true);
  }

  return (
    <>
      <Head>
        <title>Ecomerce Products</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.productsPageDiv}>
        <div className={styles.filterDiv}>
          <Filter />
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.sortDiv}>
            <Sort />
            <DisplayProducts />
          </div>
          {!loading && (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "2.2rem",
                  color: "var(--color-font)",
                }}
              >
                {filtredProducts.length > 0
                  ? "Products found:" + filtredProducts.length
                  : "No products to display"}
              </div>

              <div
                className={
                  display === "0"
                    ? styles.productsContainer
                    : styles.productsDetailed
                }
              >
                {filtredProducts.map((p, index) => (
                  <Product key={p.id} {...p} num={index} />
                ))}
              </div>
            </>
          )}
          {loading && (
            <div className={styles.loading}>...loading, please wait</div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;

/*
export async function getServerSideProps(context) {
  const url = "https://fakestoreapi.com/products";
  const data = await axios.get(url);
  return { props: { productsServ: data.data } };
}
*/
