import React, { useState, useEffect } from "react";
import axios from "axios";

import ListItem from "../../components/ListItem/ListItem";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const [roomCountFrom, setRoomCountFrom] = useState(1);
  const [roomCountTo, setRoomCountTo] = useState(4);
  const [priceFrom, setPriceFrom] = useState(1);
  const [priceTo, setPriceTo] = useState(100000);
  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getResponse() {
      await axios
        .get(
          `https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&characteristic[209][from]=1&characteristic[209][to]=4&characteristic[234][from]=1&characteristic[234][to]=999999&characteristic[242]=239&api_key=Rlr82vMNVzxZ2Zo9mMtOiitbEQTxqS86u3f1WB8s`
        )
        .then(function (res) {
          setResp(res.data);
          setIsLoading(false);
        });
    }
    getResponse();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function getResponse() {
      await axios
        .get(
          `https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&characteristic[209][from]=${roomCountFrom}&characteristic[209][to]=${roomCountTo}&characteristic[234][from]=${priceFrom}&characteristic[234][to]=${priceTo}&characteristic[242]=239&api_key=Rlr82vMNVzxZ2Zo9mMtOiitbEQTxqS86u3f1WB8s`
        )
        .then(function (res) {
          setResp(res.data);
          setIsLoading(false);
        });
    }
    getResponse();
  }, [roomCountFrom, roomCountTo, priceFrom, priceTo]);

  return (
    <div className="home_container">
      <div className="home_filters">
        <div className="filter_price">
          <label>
            Ціна:
            <input
              id="price"
              name="priceFrom"
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            ></input>
            <input
              id="price"
              name="priceTo"
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="filter_rooms">
          <label>
            Кількість кімнат:
            <select
              name="roomsCountFrom"
              id="rooms_count"
              value={roomCountFrom}
              onChange={(e) => setRoomCountFrom(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <select
              name="roomsCountTo"
              id="rooms_count"
              value={roomCountTo}
              onChange={(e) => setRoomCountTo(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
        </div>
      </div>
      <div className="home_items">
        {!isLoading && resp ? (
          resp.items.map((item, index) => {
            if (index >= 0 && index < 10) {
              return <ListItem key={index} itemsId={item} />;
            }
            return null;
          })
        ) : (
          <Spinner animation="border" />
        )}
      </div>
      {!isLoading && resp !== null ? (
        <div className="pagination"></div>
      ) : (
        "Load"
      )}
    </div>
  );
};

export default Home;
