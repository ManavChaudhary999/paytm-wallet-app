import React from 'react';

const CardContainer = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
        {children}
      </div>
    </div>
  )
};

export default CardContainer;