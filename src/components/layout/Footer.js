import React from 'react';

const Header = () => {
  const date = new Date().getFullYear();
  return (
    <div className="cont-footer px-3">
      Sistema de entrevistas  {date}
    </div>
  );
}
 
export default Header;