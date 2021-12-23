import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Tle from './table';
import Add from './add';


function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Tle />}></Route>
        <Route path="/add" element={<Add />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
