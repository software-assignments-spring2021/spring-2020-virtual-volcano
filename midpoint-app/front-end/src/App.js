import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SideBar from "./sidebar";
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';


const App = () => (
  <div className="ui container">
      <SideBar right/>

      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage}/>
  </div>
);


// function App() {
//   return (
//     <div className="App">
//       {/* insert the hamburger menu. feel free to comment out this line
//       until we can implement it fully */}
//       <SideBar/>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
