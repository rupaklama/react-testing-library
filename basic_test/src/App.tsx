import React from 'react';

import './App.css';

function App() {

  const [name, setName] = React.useState('');

  return (
    <div className="App">
      <span>My name is: { name } </span>
      <br />
      <button onClick={e => setName('Rupak')}>Set Name to Rupak</button>
    </div>
  );
}

export default App;
