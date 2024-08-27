import React from 'react';
import {Link} from 'react-router-dom';

const BottomWarning = ({label, color, href, children}) => {  
  return (
    <p className={`mt-6 text-center text-${color || 'gray'}-500`}>
      {children}
      { href && <Link to={href} className="text-indigo-600 hover:text-indigo-500">{label}</Link> }
    </p>
  )
}

export default BottomWarning;