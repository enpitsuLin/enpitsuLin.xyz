import React from 'react';

export const Page: React.FC = (props) => {
  return (
    <div>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
};
