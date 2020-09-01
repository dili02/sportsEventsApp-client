import React from 'react';

import Routes from './routes'

import './App.css';
import { Container } from 'reactstrap'

function App() {
   return (
      <Container>
         <h1>SPORT'S EVENTS APP</h1>
         <div className="content">
            <Routes />
         </div>
      </Container>
  );
}

export default App;
