import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import { ProductDetails } from "../../components/ProductDetails";
import { useSelector } from "react-redux";
import { useLocalStorageValue } from "@mantine/hooks";
import axios from "axios";
import { getProductsServ, getProductServ } from "../../lib/getProductsServ";
import { NUM_STATIC_PRODUCT_PAGES } from "../../variables";

export default function OneProduct({ productServ }) {
  const { query } = useRouter();
  const [productCli, setProductCli] = useState();
  const [loading, setLoading] = useState(false);
  const { products, current } = useSelector((state) => state.products);

  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const product = products[current - 1] ?? currProdLocal.currProd;

  console.log(productServ);
  /*useEffect(() => {
    getProduct();
  }, [query]);

  const getProduct = async () => {
    setLoading(true);
    const url = `/api/${query.id}`;
    const data = await axios.get(url);
    setProductCli(data.data[0]);
    setLoading(false);
  };*/

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
          <ProductDetails {...productServ} />
        </div>
      )}
      {loading && <div>...loading</div>}

      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await getProductServ(id);

  return { props: { productServ: data[0] } };
}
export async function getStaticPaths() {
  const data = await getProductsServ();

  let paths = data
    .slice(0, NUM_STATIC_PRODUCT_PAGES)
    .map((p) => `/product/${p.id}`);
  return { paths, fallback: false };
}
