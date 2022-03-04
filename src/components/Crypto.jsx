import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect } from "react";
import Loader from "./Loader";
const Crypto = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const showSearch = simplified ? false : true;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredCoins = cryptosList?.data?.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredCoins);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <>
      {showSearch && (
        <div className="search-crypto">
          <Input.Search
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
            enterButton
            size="large"
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                hoverable
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                headStyle={{
                  backgroundColor: "#0e4477",
                  color: "#fff",
                }}
              >
                <p>Price: {millify(currency.price)}$</p>
                <p>M.CAP: {millify(currency.marketCap)}</p>
                {millify(currency.change) >= 0 ? (
                  <p>
                    24h:{" "}
                    <span className="green-trend">
                      {millify(currency.change)}%
                    </span>
                  </p>
                ) : (
                  <p>
                    24h:{" "}
                    <span className="red-trend">
                      {millify(currency.change)}%
                    </span>
                  </p>
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Crypto;
