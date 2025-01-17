import { LENGUAJE_AUTO, LENGUAJES_SOPORTADOS } from "./constantes";

export interface State {
  // No lleva signo =
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  toText: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCAMBIO_DE_IDIOMA" }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_TO_TEXT"; payload: string };

export type Language = keyof typeof LENGUAJES_SOPORTADOS;
export type AutoLanguage = typeof LENGUAJE_AUTO;
export type FromLanguage = Language | AutoLanguage;

export enum SecType {
  From = "from",
  To = "to",
}
