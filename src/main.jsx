import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Container001 from "./chapters/001/Container001.jsx";
import TransitionScreen from "./components/transition_screen/TransitionScreen.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Container001/>
        <TransitionScreen/>
    </StrictMode>,
)
