import "./App.css";
import Categories from "./components/Categories";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Meal from "./components/Meal";
import Button from "./components/Button";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/meal/:foodName" element={<Meal />} />
        <Route path="/button" element={<Button />} />
      </Routes>
    </>
  );
}

export default App;
