import classNames from 'classnames';
import React, { FunctionComponent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';
import NavLink from './NavLink';
import { useResponsive } from '@/hooks/useResponsive';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  navList: {
    path: string;
    title: string;
    icon: IconType;
  }[];
}

const NavButton: FunctionComponent<Props> = ({ navList }) => {
  const [isOpen, setOpen] = useState(false);
  const responsive = useResponsive();
  useEffect(() => {
    if (responsive.md) {
      setOpen(false);
    }
  }, [responsive]);
  return (
    <>
      <Offcanvas
        show={isOpen}
        onHide={() => {
          setOpen(false);
        }}
        placement="end"
      >
        <Offcanvas.Header>
          <button onClick={() => setOpen(false)}>
            <FaTimes size={20} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="flex flex-col" style={{ marginRight: '-1rem' }}>
            {navList.map((item, index) => (
              <div
                key={index}
                className={classNames(
                  'hover:bg-primary-100 hover:bg-opacity-20',
                  'transition-background-color duration-300',
                  'cursor-pointer',
                  'rounded-l-3xl',
                  'pl-4 py-2'
                )}
              >
                <NavLink title={item.title} to={item.path} icon={item.icon} className="text-lg" />
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <button
        className={classNames(
          'block sm:hidden',
          'ml-auto',
          'px-5 py-2 mx-1',
          'transition-all',
          'border border-white border-opacity-50 rounded hover:bg-primary-100',
          'text-white'
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <FaBars />
      </button>
    </>
  );
};

export default NavButton;
