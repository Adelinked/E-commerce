import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import styles from "../../styles/Products.module.css";
import { ProductDetails } from "../../components/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorageValue } from "@mantine/hooks";

export default function OneProduct() {
  const { query } = useRouter();
  const { products, current } = useSelector((state) => state.products);
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  //const product = products[current - 1] ?? currProdLocal.currProd;
  return (
    <>
      <Head>
        <title>Ecomerce One Product</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <ProductDetails />
      </div>

      <Footer />
    </>
  );
}
