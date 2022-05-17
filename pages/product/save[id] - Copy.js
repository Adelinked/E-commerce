import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import styles from "../../styles/Products.module.css";
import ProductDetails from "../../components/ProductDetails";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function OneProduct() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `../api/product/${query.id}`,
    fetcher
  );
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  async function getProdDetails() {
    try {
      //const url = `https://fakestoreapi.com/products/${id}`;
      const url = `../api/product/${query.id}`;
      const res = await axios.get(url);
      const { data } = res;
      setProdDet(data.data);
    } catch (error) {}
  }
  /*useEffect(() => {
    getProdDetails();
  }, []);*/
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
