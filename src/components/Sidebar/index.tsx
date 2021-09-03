import React from 'react';

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <div id="secondary">
      <section className="widget">
        <form id="search" method="post" action="./">
          <input type="text" name="s" className="text" placeholder="搜索..." />
          <button type="submit" className="submit">
            <i className="icon-search" />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Sidebar;
