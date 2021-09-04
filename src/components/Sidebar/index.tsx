import React from 'react';

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <div id="sidebar" className="mt-10 pl-9 border-l border-l-gray-300 pb-5">
      <section className="widget">
        <form id="search" method="post" action="./" className="relative py-1 pl-6 pr-2 border rounded border-gray-400">
          <input type="text" name="q" className="outline-none" placeholder="Search..." />
          <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <i className="fa fa-search text-gray-400" />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Sidebar;
