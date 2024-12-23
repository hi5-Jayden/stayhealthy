import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  primaryActionText = 'Confirm',
  secondaryActionText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap="3">
          <Button variant="outline" onClick={onClose}>
            {secondaryActionText}
          </Button>
          {primaryAction && (
            <Button
              bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
              color="white"
              onClick={primaryAction}
              isLoading={isLoading}
              _hover={{ opacity: 0.9 }}
            >
              {primaryActionText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
