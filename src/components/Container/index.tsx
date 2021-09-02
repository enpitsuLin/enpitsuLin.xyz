import * as React from 'react';
import Sidebar from '../Sidebar';

const Container: React.FC = ({ children }) => {
  return (
    <div id="body">
      <div className="container">
        <div className="col-group">
          <div className="col-8" id="main">
            <div className="res-cons">{children}</div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Container;
