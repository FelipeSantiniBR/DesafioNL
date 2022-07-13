import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

import Router from "./Routes";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Router />
    </BrowserRouter>
  );
}

export default App;
