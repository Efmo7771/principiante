import { useReducer } from "react";
import { type FromLanguage, type Action, type State, Language } from "../types";
//------------------------------------------------
const inicialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  toText: "",
  loading: false,
};
//-------------------------------------------------
function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === "INTERCAMBIO_DE_IDIOMA") {
    if(state.fromLanguage==='auto') return state
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }
  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }
  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      toText: "",
    };
  }
  if (type === "SET_TO_TEXT") {
    return {
      ...state,
      toText: action.payload,
      loading: false,
    };
  }

  return state;
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, toText, loading }, dispatch] =
    useReducer(reducer, inicialState);

    const intercambiaIdioma = () =>{
        dispatch({type: 'INTERCAMBIO_DE_IDIOMA'})
    }

    const configuraIdiomaEntrada = (payload:FromLanguage) =>{
        dispatch({type: 'SET_FROM_LANGUAGE',payload})
    }
    const configuraIdiomaSalida = (payload:Language) =>{
        dispatch({type: 'SET_TO_LANGUAGE',payload})
    }
    const configuraTextoEntrada = (payload:string) =>{
        dispatch({type: 'SET_FROM_TEXT',payload})
    }
    const configuraTextoSalida = (payload:string) =>{
        dispatch({type: 'SET_TO_TEXT',payload})
    }
    


  return {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading,
    intercambiaIdioma,
    configuraIdiomaEntrada,
    configuraIdiomaSalida,
    configuraTextoEntrada,
    configuraTextoSalida,
  };
}
