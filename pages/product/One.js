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
import axios from "axios";

export default function OneProduct(
  {
    /*productServ*/
  }
) {
  const { query } = useRouter();
  const [productCli, setProductCli] = useState();
  const [loading, setLoading] = useState(false);
  const { products, current } = useSelector((state) => state.products);

  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const product = products[current - 1] ?? currProdLocal.currProd;

  useEffect(() => {
    getProduct();
  }, [query]);

  const getProduct = async () => {
    setLoading(true);
    const url = `/api/${query.id}`;
    const data = await axios.get(url);
    setProductCli(data.data[0]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>E-commerce One Product</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {!loading && (
        <div>
          <ProductDetails {...productCli} />
        </div>
      )}
      {loading && <div>...loading</div>}

      <Footer />
    </>
  );
}
/*
export async function getServerSideProps(context) {
  const id = context.query.id;
  const url = `https://fakestoreapi.com/products/${id}`;

  const data = await axios.get(url);
  return { props: { productServ: data.data } };
}*/
