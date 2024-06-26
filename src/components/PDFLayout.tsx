import React from 'react';
import PropTypes from 'prop-types';

const renderPDFFooter = () => (
    <div
        id="pageFooter"
        style={{
            fontSize: '10px',
            color: '#666'
        }}
    >
        This is a sample footer
    </div>
);

//@ts-ignore
const PDFLayout = ({ children }) => (
    <html>
        {/* @ts-ignore */}
        <head>
            <meta charSet="utf8" />
            <link rel="stylesheet" href="http://localhost:1234/static/pdf.css" />
        </head>
        <body>
            {children}
            {renderPDFFooter()}
        </body>
    </html>
);

PDFLayout.propTypes = {
    children: PropTypes.node,
};

export default PDFLayout;