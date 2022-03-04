import axios from "axios";
import React, { useState, useEffect } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import Loader from "./Loader";
//axios jer coinranking api nema exchanges endpoint(placa se)
const { Text } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  //useeffect hook za dohvacanje podataka prilikom renderanja komponente
  useEffect(() => {
    try {
      axios
        .get("https://api.coingecko.com/api/v3/exchanges?per_page=50")
        .then((res) => {
          setExchanges(res.data);
          console.log(res.data);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  }, []);
  //ako je loading true loader animacija

  if (!loading) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6} style={{ textAlign: "center" }}>
          24h Trade Volume
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          Trust score
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          Country
        </Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col style={{ width: "18.9vw" }}>
                      <Text>
                        <strong>{exchange["trust_score_rank"]}.</strong>
                      </Text>

                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col style={{ width: "18.9vw", textAlign: "center" }}>
                      {millify(exchange["trade_volume_24h_btc"])} BTC
                    </Col>
                    <Col style={{ width: "18.9vw", textAlign: "center" }}>
                      {exchange["trust_score"]}
                    </Col>
                    <Col style={{ width: "18.9vw", textAlign: "center" }}>
                      {exchange.country || "No info."}.
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "No information.")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Exchanges;
