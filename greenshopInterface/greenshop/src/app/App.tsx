import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@pages/home/Home';
import Shop from "@pages/shop/Shop.tsx";
import {Layout} from "@/app/layout";

function App() {
  return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop/>}/>
          </Routes>
        </BrowserRouter>
      </Layout>
  );
}

export default App;