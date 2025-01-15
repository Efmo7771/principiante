import "./App.css";
import { Router } from "./Router";
import { Search } from "./pages/Search.";
import { Route } from "./pages/Route";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
//import { Suspense, lazy } from "react";

//const LazyHomePage = lazy(() => import("./pages/Home.jsx"));
//const LazyAboutPage = lazy(() => import("./pages/About.jsx"));

const routes = [
  {
    path: "/search/:query",
    Component: Search,
  },
  {
    path: "/:lang/about",
    Component: AboutPage,
  },
];

function App() {
  return (
    <main>
      
        <Router routes={routes}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
        </Router>
      
    </main>
  );
}

export default App;
