import React, { FunctionComponent } from 'react';
import { Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaBars } from 'react-icons/fa';

interface Props {
  toggle: () => void;
  isOpen: boolean;
}

const MenuToggle: FunctionComponent<Props> = ({ toggle, isOpen }) => {
  return (
    <Button display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <FaBars />}
    </Button>
  );
};

export default MenuToggle;
