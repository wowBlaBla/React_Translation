import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TranslateProvider } from "./translate";
import Home from "./views/home";

function App() {
  return (
    <TranslateProvider>
      <Home />
    </TranslateProvider>
  );
}

export default App;
