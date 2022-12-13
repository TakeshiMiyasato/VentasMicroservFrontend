import logo from './logo.svg';
import './App.css';
import RoutesParadox from './config/RoutesParadox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <RoutesParadox />
        </Container>
      </Router>
    </div>
  );
}

export default App;
