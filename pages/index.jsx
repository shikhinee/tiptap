import Head from "next/head";
import { useRef, Fragment } from "react";

import scrollTo from "@/utils/functions/scrollTo";

import DefaultLayout from "@/layouts/Default";
import Editor from "@/components/Editor";
import styles from "./Root.module.scss";

const RootPage = (props) => {
  const ref = useRef(null);

  const handleClick = () => {
    // 2 times Navbar Height
    scrollTo(ref, 140);
  };

  return (
    <Fragment>
      <Head>
        {/* TITLE */}
        <title>Solid Project 2.0</title>
        <meta property="og:title" content="Solid Project 2.0" key="title" />
      </Head>

      <main className={styles.container}>
        <Editor />
      </main>
    </Fragment>
  );
};

// LAYOUT DECLARATION
RootPage.Layout = DefaultLayout;

export default RootPage;
