import classNames from 'classnames';
import React, { FunctionComponent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';
import NavLink from './NavLink';
import { useResponsive } from '@/hooks/useResponsive';
import styled from 'styled-components';

const NavMenu = styled.button`
  display: block;
  margin-right: 0.25rem;
  margin-left: auto;
  padding: 0.5rem 1.25rem;
  border: 1px rgba(255, 255, 255, 0.5) solid;
  border-radius: 0.25rem;
  &:hover {
    background-color: var(--primary-100);
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

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
      <NavMenu
        onClick={() => {
          setOpen(true);
        }}
      >
        <FaBars />
      </NavMenu>
    </>
  );
};

export default NavButton;
