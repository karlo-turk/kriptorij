import React, { useState } from "react";
import { ScrollButton } from "./components";
import { Route, Routes, Link } from "react-router-dom";
//komponente antdesigna
import { Typography, Space, Layout } from "antd";
import {
  Navbar,
  Homepage,
  Crypto,
  Blog,
  CryptoDetails,
  Exchanges,
} from "./components"; //importanje svih komponenta
import "./App.css"; //css

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/cryptocurrencies" element={<Crypto />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
          </div>
          <ScrollButton />
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Kriptorij <br /> ⓒ Karlo Turk 2022. All rights reserverd
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
