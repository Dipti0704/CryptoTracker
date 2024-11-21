import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import "./Coins.css";
import CoinCard from "./CoinCard";

function Coins() {
  let [coins, setCoins] = useState([]);
  let [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [currency, setCurrency] = useState("inr");
  let [error, setError] = useState(false);
  let [selectedOption, setSelectedOption] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "Rs " : currency === "eur" ? "EUR " : "$ ";

  const pageChange = (pa) => {
    setLoading(true);
    setPage(pa);
  };

  const pageNo = new Array(132).fill(1);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      setCoins(data);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency, page]);

  const selected = (e) => {
    setSelectedOption(e.target.value);
  };

  if (error) {
    return <h1>ERROR WHILE FETCHING DATA</h1>;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="currencyChange">
            <label className="lab">
              <input
                type="radio"
                name="curr"
                value={"inr"}
                onClick={(e) => setCurrency(e.target.value)}
                checked={selectedOption === "inr"}
                onChange={selected}
              />
              INR
            </label>
            <label className="lab">
              <input
                type="radio"
                name="curr"
                value={"usd"}
                onClick={(e) => setCurrency(e.target.value)}
                checked={selectedOption === "usd"}
                onChange={selected}
              />
              USD
            </label>
            <label className="lab">
              <input
                type="radio"
                name="curr"
                value={"eur"}
                onClick={(e) => setCurrency(e.target.value)}
                checked={selectedOption === "eur"}
                onChange={selected}
              />
              EUR
            </label>
          </div>

          <HStack wrap={"wrap"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              ></CoinCard>
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={8}>
            {pageNo.map((item, indx) => (
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => pageChange(indx + 1)}
              >
                {indx + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coins;
