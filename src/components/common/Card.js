import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ children, ...props }) => {
  return (
    <Box
      bg="white"
      borderRadius="12px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      p="5"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
