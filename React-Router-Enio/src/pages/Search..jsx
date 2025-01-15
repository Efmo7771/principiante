import React from "react";
import { Link } from "../Link";

export const Search = ({ routeParams }) => {
  return (
    <>
      <div>
        <h1>Página para rutas dinamicas</h1>
        <p>LLendo a {routeParams.query}</p>
      </div>
      <div>
        <Link to="/">Volver al Principal</Link>
      </div>
    </>
  );
};
