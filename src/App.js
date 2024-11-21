import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./COMP/Header";
import Home from "./COMP/Home";
import Coins from "./COMP/Coins";
import Exchanges from "./COMP/Exchanges";
import CoinDetails from "./COMP/CoinDetails";
import Footer from "./COMP/Footer";

function App() {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Router>
        <Header />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
