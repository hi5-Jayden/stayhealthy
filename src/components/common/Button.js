import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ variant = 'primary', children, ...props }) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          bgGradient: 'linear(to-r, brand.primary.500, #6F3AFA)',
          color: 'white',
          _hover: { opacity: 0.9 },
        };
      case 'secondary':
        return {
          variant: 'outline',
          color: 'brand.primary.500',
          borderColor: 'brand.primary.500',
        };
      case 'danger':
        return {
          bg: 'brand.red',
          color: 'white',
          _hover: { opacity: 0.9 },
        };
      default:
        return {};
    }
  };

  return (
    <ChakraButton
      px="6"
      h="48px"
      borderRadius="8px"
      fontWeight="500"
      {...getVariantProps()}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
