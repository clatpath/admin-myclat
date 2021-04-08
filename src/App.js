import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Screens/Login/Login';
import Signup from './Screens/Signup/Signup';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Homepage from './Screens/Homepage/Homepage';
import Addtest from './Screens/Addtest/Addtest';
import Viewmocks from './Screens/Viewmocks/Viewmocks';
import Mockdetails from './Screens/Mockdetails/Mockdetails';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
          <Route path="/" component={Homepage} exact />
          <Route path="/signin" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/addtest" component={Addtest} exact />
          <Route path="/viewmocks" component={Viewmocks} exact />
          <Route path="/viewmocks/:id" component={Mockdetails} exact />
      </Router>
    </div>
  );
}

export default App;
