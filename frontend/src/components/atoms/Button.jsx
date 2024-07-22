import React from 'react';
// import './Button.css';

const Button = ({ type, className, children }) => (
    <button type={type} className={className}>
        {children}
    </button>
);

export default Button;
