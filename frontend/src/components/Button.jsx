import React from 'react';

const Button = ({type, onClick, disabled, children}) => {
  return (
    <div>
      <button
        type={type || "submit"}
        onClick={onClick}
        disabled={disabled || false}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {children || "Click Me"}
      </button>
    </div>
  );
}

export default Button;