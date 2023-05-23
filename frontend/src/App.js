import {Routes,Route} from "react-router-dom";
import Search from "./Search.jsx";
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element={<Search />} />
    </Routes>
    </>
  );
}

export default App;
