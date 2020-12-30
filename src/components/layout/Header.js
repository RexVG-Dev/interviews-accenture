import React from 'react';
import { useHistory } from 'react-router-dom';

const Footer = () => {

  const history = useHistory();

  const handleClickNav = (e) => {
    e.preventDefault();
    history.push('/');
  }

  return (
    <div className="cont-header">
      <h1 className="ml-3 cursor-pointer" onClick={handleClickNav}>Accenture</h1>
      {/* <button type="button" onClick={handleClickNav}>Home</button>
      <span>Header</span> */}
    </div>
  );
}

export default Footer;