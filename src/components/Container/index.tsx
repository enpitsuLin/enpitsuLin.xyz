import React from 'react';
import Sidebar from '../Sidebar';
import Totop from '../Totop';

const Container: React.FC = ({ children }) => {
  return (
    <div id="body">
      <div className="container">
        <div className="col-group">
          <div className="col-8" id="main">
            <div className="res-cons">{children}</div>
          </div>
          <Sidebar />
          <Totop />
        </div>
      </div>
    </div>
  );
};

export default Container;
