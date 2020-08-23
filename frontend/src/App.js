import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/navbar/navbar'

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
