import React, { FunctionComponent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { IconType } from 'react-icons';
import NavLink from './NavLink';
import { useResponsive } from '@/hooks/useResponsive';
import styled from 'styled-components';

const NavDrawer = styled(Offcanvas)`
  width: 60%;
  background: var(--bs-secondary);
  color: var(--text-color);
`;

const NavMenuButton = styled(Button)`
  color: #fff;
  background-color: #0000;
  margin-right: 0.25rem;
  margin-left: auto;
  padding: 0.5rem 1.25rem;
  border: 1px rgba(255, 255, 255, 0.5) solid;
  border-radius: 0.25rem;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--primary-100);
    border-color: var(--primary-100);
    box-shadow: none;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -1rem;
  > a {
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    padding: 1rem 0;
    padding-left: 2.25rem;
    &:hover,
    &.active {
      background-color: var(--primary-100);
      color: #fff;
    }
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
      <NavDrawer
        show={isOpen}
        onHide={() => {
          setOpen(false);
        }}
        placement="end"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <NavMenu>
            {navList.map((item, index) => (
              <NavLink key={index} title={item.title} to={item.path} icon={item.icon} />
            ))}
          </NavMenu>
        </Offcanvas.Body>
      </NavDrawer>

      <NavMenuButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <FaBars />
      </NavMenuButton>
    </>
  );
};

export default NavButton;
