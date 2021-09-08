import classNames from 'classnames';
import React, { FunctionComponent, HtmlHTMLAttributes, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {}

const NavButton: FunctionComponent<Props> = props => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Offcanvas
        show={isOpen}
        onHide={() => {
          setOpen(false);
        }}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
          etc.
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
