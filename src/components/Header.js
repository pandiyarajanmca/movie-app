import React from "react";

const Header = () => {
  return (
    <header onClick={() => window.scroll(0, 0)} className="App-header">
      <h2>Movies Exercise</h2>
    </header>
  );
};

export default Header;