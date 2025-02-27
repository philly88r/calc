import React from 'react';

const Logo = ({ height = '80px' }) => {
  return (
    <div style={{ height, display: 'flex', alignItems: 'center' }}>
      <svg
        viewBox="0 0 400 120"
        style={{
          height: '100%',
          width: 'auto',
        }}
      >
        <defs>
          <style>
            {`
              .logo-text { font-family: Arial, sans-serif; font-weight: bold; }
              .fence-text { font-family: "Times New Roman", serif; font-weight: bold; }
            `}
          </style>
        </defs>
        <g transform="translate(10, 60)">
          <text
            className="logo-text"
            x="0"
            y="0"
            fontSize="48"
            fill="#8B4513"
            style={{ fontStyle: 'italic' }}
          >
            South Texas
          </text>
          <text
            className="fence-text"
            x="0"
            y="40"
            fontSize="42"
            fill="#8B4513"
          >
            FENCE & DECK
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
