import React from "react";
import milify from "millify";
import { Typography, Row, Col, Statistic, Divider } from "antd";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Crypto, Blog } from "../components";
import { useGetCryptosQuery } from "../services/cryptoApi";

//millify library za prikaz ljepših brojeva
const { Title } = Typography;

const Homepage = () => {
  //koristimo api za top 10 kriptovaluta te ih prikazujemo kao antdesign kartice
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats; //opcenito o kripto, nalazi se u getcryptoquery
  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Cryptocurrencies Statistics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Coins" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={milify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h volume"
            value={milify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={globalStats.totalMarkets} />
        </Col>
      </Row>
      <Divider />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>

        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>

      <Crypto simplified />
      <Divider />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Crypto Blog
        </Title>
        <Title level={4} className="show-more">
          <Link to="/blog">Show more</Link>
        </Title>
      </div>
      <Blog simplified />
    </>
  );
};

export default Homepage;
