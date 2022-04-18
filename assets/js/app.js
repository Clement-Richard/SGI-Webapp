import React, { StrictMode, Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import '../styles/app.css';
import NavBar from './Components/NavBar';
import Formation from './Components/Formation';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

class App extends Component {
    render() {
        console.log('Rendering..');
        root.render(
            <Router>
            <NavBar/>
            <div>
                <Routes>
                    <Route path='/home/formation' element={<Formation/>} />
                </Routes>
            </div>
            </Router>
        );
    }
  }
  
  export default App;