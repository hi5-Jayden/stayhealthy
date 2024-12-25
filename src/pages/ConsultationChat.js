import React from 'react';
import {
  Container,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';

const ConsultationChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { consultation, doctor } = location.state || {};
  const {
    isOpen: isEndDialogOpen,
    onOpen: openEndDialog,
    onClose: closeEndDialog,
  } = useDisclosure();
  const cancelRef = React.useRef();

  // If no consultation data, redirect to consultation page
  React.useEffect(() => {
    if (!consultation || !doctor) {
      toast({
        title: 'Error',
        description:
          'No consultation data found. Please start a new consultation.',
        status: 'error',
        duration: 5000,
      });
      navigate('/services/instant-consultation');
    }
  }, [consultation, doctor, navigate, toast]);

  const handleEndConsultation = () => {
    closeEndDialog();
    toast({
      title: 'Consultation Ended',
      description:
        'Thank you for using our service. You can now rate your experience.',
      status: 'info',
      duration: 5000,
    });
    // Navigate to review page
    navigate('/reviews/add', {
      state: {
        consultationId: consultation.id,
        doctorId: doctor.id,
        doctorName: doctor.name,
      },
    });
  };

  if (!consultation || !doctor) {
    return null;
  }

  return (
    <Container maxW="6xl" h="calc(100vh - 80px)" py={4}>
      <VStack h="full" spacing={4}>
        <Box
          w="full"
          h="full"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="white"
          p={4}
        >
          <ChatInterface doctor={doctor} consultation={consultation} />
        </Box>
      </VStack>

      {/* End Consultation Dialog */}
      <AlertDialog
        isOpen={isEndDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeEndDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>End Consultation?</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to end this consultation? You'll be asked to
              provide feedback about your experience.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeEndDialog}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleEndConsultation} ml={3}>
                End Consultation
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default ConsultationChat;
