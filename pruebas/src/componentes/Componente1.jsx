import React from "react";
import { Componente11 } from "./Componente11";
import { funcion } from "./funcion";

const nombre = "Enio Maita";

let a = 12;
let b = 13;
export const Componente1 = () => {
  const valor = Componente11((a = a), (b = b));
  const otrovalor = funcion(a, b);

  return (
    <>
      <h3>
        Este componente lo uso para dibujar algo en pantalla (renderizado){" "}
        {nombre}
      </h3>
      <p>y este como una función {valor}</p>
      <p>esta si es una función {otrovalor}</p>
    </>
  );
};
