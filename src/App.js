import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { ToastContainer, toast, Slide } from "react-toastify";
toast.configure();

function App() {
  return (
    <div className="App">
      <Home />
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
