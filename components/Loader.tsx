
import React from 'react';

const Loader: React.FC = () => {
  return (
    <>
      <div className="loader"></div>
      <style>{`
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          border: 3px solid;
          border-color: #38bdf8 #38bdf8 transparent transparent;
          box-sizing: border-box;
          animation: spin 1.2s linear infinite;
        }
        .loader::after,
        .loader::before {
          content: '';  
          box-sizing: border-box;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border: 3px solid;
          border-color: transparent transparent #0ea5e9 #0ea5e9;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-sizing: border-box;
          animation: spin-back 1s linear infinite;
          transform-origin: center center;
        }
        .loader::before {
          width: 32px;
          height: 32px;
          border-color: #67e8f9 #67e8f9 transparent transparent;
          animation: spin 1.5s linear infinite;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-back {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;