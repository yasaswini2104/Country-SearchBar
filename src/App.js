import React from "react";
import CountrySearch from "./components/CountrySearch";
import Navbar from "./components/Navbar"; 

const App = () => {
  return (
    <div style={{ margin: "50px auto", maxWidth: "600px" }}>
      <Navbar />
      <h1>Country Search</h1>
      <CountrySearch />
    </div>
  );
};

export default App;
