import { Toaster } from "sonner";
import "./App.css";
import { IngresoFormat } from "./componentes/IngresoFormat";
import { ListaUsuario } from "./componentes/ListaUsuarios";

function App() {
  return (
    <>
      <ListaUsuario />
      <IngresoFormat />
      <Toaster richColors />
    </>
  )
}
export default App;
