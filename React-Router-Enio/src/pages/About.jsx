import React from "react";
import { Link } from "../Link";

const i18n = {
  es: {
    title: "ABOUT en Español",
    parrafo: "El español es el mejor idioma del Mundo",
    boton: "Volver al principal",
  },
  en: {
    title: "ABOUT in Inglish",
    parrafo: "The Inglish is the better language of the world",
    boton: "Back to Main",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.es
};

export function AboutPage({routeParams}) {
  const lenguaje = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{lenguaje.title}</h1>
      <p>{lenguaje.parrafo}</p>
      <Link to="/">{lenguaje.boton}</Link>
    </>
  );
}
