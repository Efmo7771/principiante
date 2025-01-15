import React from "react";
import { Link } from "../Link";

export  function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es la página del Home</p>
      <Link to='/about'>Ir a ABOUT</Link>
    </>
  );
}
