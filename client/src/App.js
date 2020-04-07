import React from 'react';
import './style/App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <h1>nebots</h1>
      </header>
      <div className="chooser">
        <div className="clients">
          <p>Necessito ajuda</p>
        </div>
        <div className="providers">
          <p>Vull ajudar</p>
        </div>
      </div>
    </div>
  );
}

export default App;
