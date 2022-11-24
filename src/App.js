
import { Route } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import Demo from './Container/CountDown';



function App() {
  return (
    <div className="App">

      <Route path={"/"} exact component={Login} />
      <Route path={"/home"} exact component={Demo} />

    </div>
  );
}

export default App;
