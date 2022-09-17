import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Router />);
