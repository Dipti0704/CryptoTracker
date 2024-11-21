// import { Box, Container, Stat, StatLabel, VStack } from "@chakra-ui/react";
import {
  Box,
  Container,
  VStack,
  Text,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "..";
import "./CoinDetails.css";
// import { Text, Image} from "@chakra-ui/react";

function CoinDetails() {
  let [coin, setCoin] = useState({});
  let [loading, setLoading] = useState(true);
  let [currency, setCurrency] = useState("inr");
  let [error, setError] = useState(false);
  let [selectedOption, setSelectedOption] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "Rs " : currency === "eur" ? "EUR " : "$ ";

  const params = useParams();

  const fetching = async () => {
    try {
      const { data } = await axios.get(`${server}/coins/${params.id}`);
      setCoin(data);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    fetching();
  }, [params.id]);

  if (error) {
    return <h1>ERROR WHILE FETCHING DATA</h1>;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1} textAlign={"center"}>
            WELCOME TO THE WORLD OF INFORMATION
          </Box>
          <div className="currencyChange">
            <label className="lab">
              <input
                type="radio"
                name="curr"
                value={"inr"}
                onClick={(e) => setCurrency(e.target.value)}
                checked={selectedOption === "inr"}
                onChange={(e) => (setSelectedOption(e.target.value))}
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
                onChange={(e) => (setSelectedOption(e.target.value))}
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
                onChange={(e) => (setSelectedOption(e.target.value))}
              />
              EUR
            </label>
          </div>

          <VStack spacing={4} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Upadated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            ></Image>

            <div>
              <div>
                <label>{coin.name}</label>
              </div>
              <label className="">
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </label>
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <div class="stat-arrow">
                  {coin.market_data.price_change_percentage_24h}
                </div>
              ) : (
                <div class="stat-arrow decrease">
                  {coin.market_data.price_change_percentage_24h}
                </div>
              )}
            </div>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.950"} color={"white"}>
              {" "}
              {`${coin.market_cap_rank}`}{" "}
            </Badge>

            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={4}>
              <Item
                title={"Max supply"}
                value={coin.market_data.max_supply}
              ></Item>
              <Item
                title={"Circulating supply"}
                value={coin.market_data.circulating_supply}
              ></Item>
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              ></Item>
              <Item
                title={"all time low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              ></Item>
              <Item
                title={"all time high"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const CustomBar = ({ high, low }) => {
  return (
    <VStack>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "50%" }}></div>
      </div>

      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24 Hour Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={4}>
      <Text letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
