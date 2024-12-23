import React from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
} from '@chakra-ui/react';

const Input = ({ label, error, isRequired, ...props }) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput
        h="48px"
        borderRadius="8px"
        borderColor="brand.gray.border"
        _focus={{
          borderColor: 'brand.primary.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary-500)',
        }}
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
