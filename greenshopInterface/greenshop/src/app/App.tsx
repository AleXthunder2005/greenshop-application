import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@pages/home';
import { Shop } from "@pages/shop";
import { Layout } from "@/app/layout";
import { ShoppingCart } from '@/pages/shoping-cart';
import {CheckoutPage} from "@pages/checkout";

function App() {
  return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop/>}/>
            <Route path={"/shopping-cart"} element={<ShoppingCart/>}/>
            <Route path={"/checkout"} element={<CheckoutPage/>}/>
          </Routes>
        </BrowserRouter>
      </Layout>
  );
}

export default App;