import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Product from "../components/Product";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../store/actions/appAction";
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
const Index = ({ productsServ }) => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>E-commerce Home</title>
        <meta name="description" content="Ecommerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.indexDiv}>
        <div className={styles.indexImgDiv}>
          <img style={{ width: "100%" }} src="/goods.jpg"></img>
        </div>

        <div className={styles.indexTextDiv}>
          <h2 className={styles.indexTitles}>Get the best of the market</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            accusantium sapiente tempora sed dolore esse deserunt eaque
            excepturi, delectus error accusamus vel eligendi, omnis beatae.
            Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
            dolore, obcaecati incidunt sequi blanditiis est exercitationem
            molestiae delectus saepe odio eligendi modi porro eaque in libero
            minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
            ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
            similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
            iste.
          </p>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              dispatch(setAppLoading(false));
              router.push("/products");
            }}
          >
            Shop now
          </button>
        </div>
      </div>
      <div className={styles.indexFeaturedDiv}>
        <div className={styles.indexTextDiv}>
          <h2 className={styles.indexTitles}>Featured Products</h2>
        </div>
        <div className={styles.indexFeaturedImgDiv}>
          {productsServ.slice(1, 4).map((p) => (
            <Product key={p.id} {...p} fromIndex={true} />
          ))}
        </div>
        <button
          onClick={() => {
            dispatch(setAppLoading(true));
            router.push("/products");
          }}
        >
          All products
        </button>
      </div>
      <div className={styles.indexDiv}>
        <div className={styles.subsTextDiv}>
          <h3>Join our newsletter and get 20% off</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            sint unde quaerat ratione soluta veniam provident adipisci cumque
            eveniet tempore?
          </p>
        </div>
        <div className={styles.subscribeForm}>
          <input
            value={email}
            type="email"
            name="subscribe"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setEmail(
                ValidateEmail(email) ? "Email sent..." : "Enter a valid email"
              );
              setTimeout(() => {
                setEmail("");
              }, 800);
            }}
          >
            Subsribe
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const url = "https://fakestoreapi.com/products?limit=5";
  const data = await axios.get(url);
  return { props: { productsServ: data.data } };
}
