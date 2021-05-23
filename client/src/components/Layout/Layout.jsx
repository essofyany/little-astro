import { Container } from "@chakra-ui/layout";
import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container minH="80vh" maxW="6xl">
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
