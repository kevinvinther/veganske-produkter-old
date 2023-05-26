import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import TopNavigation from "./TopNavigation";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout
        className="layout"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header>
          <TopNavigation />
        </Header>
        <Content style={{ padding: "0 50px", flex: "1 0 auto" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            borderTop: "1px solid #d9d9d9",
          }}
        ></Footer>
      </Layout>
    </Router>
  );
}

export default App;
