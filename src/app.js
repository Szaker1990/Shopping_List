import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import {MainPage} from "./components/MainPage";

const App = () =>{
    return <MainPage/>
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)