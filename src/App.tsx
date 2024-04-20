import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home";
import Navigation from "./components/Navigation";
import SignIn from "./routes/sign-in/signin";
import Shop from "./routes/shop/shop.component";
import { Toaster } from "./components/ui/toaster";
import Checkout from "./routes/checkout/checkout.component";

const Offer = () => {
  return (
    <div>
      <h1>I am shop page</h1>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path="offers" element={<Offer />} /> */}
        <Route path="signin" element={<SignIn />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
