import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ServiceCard = ({ title, imageSrc, isSelected, isProtected, onClick }) => (
  <Card
    cursor="pointer"
    overflow="hidden"
    variant="outline"
    bg={isSelected ? 'blue.50' : 'white'}
    borderColor={isSelected ? 'blue.200' : 'gray.200'}
    onClick={onClick}
    _hover={{
      borderColor: 'blue.200',
      transform: 'translateY(-2px)',
      boxShadow: 'sm',
    }}
    transition="all 0.2s"
  >
    <CardBody>
      <VStack spacing="4" align="center">
        <Image
          src="/api/placeholder/100/100"
          alt={title}
          borderRadius="lg"
          boxSize="100px"
        />
        <Text fontWeight="500" textAlign="center" color="gray.800">
          {title}
        </Text>
      </VStack>
    </CardBody>
  </Card>
);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = React.useState(null);

  const services = [
    {
      title: 'Instant Consultation',
      isSelected: false,
      isProtected: true,
      path: '/services/instant-consultation',
    },
    {
      title: 'Book an Appointment',
      isSelected: true,
      isProtected: true,
      path: '/services/book-appointment',
    },
    {
      title: 'Self Check-up',
      isSelected: false,
      isProtected: false,
      path: '/services/self-checkup',
    },
    {
      title: 'Health Tips\nand Guidance',
      isSelected: false,
      isProtected: false,
      path: '/services/health-tips',
    },
  ];

  const handleServiceClick = (service) => {
    if (service.isProtected && !isAuthenticated) {
      setSelectedService(service);
      onOpen();
    } else {
      navigate(service.path);
    }
  };

  const handleAuthAction = (action) => {
    onClose();
    navigate(`/${action}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.50" pt="20" pb="32">
        <Container maxW="1200px">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing="12"
            alignItems="center"
          >
            {/* Left side content */}
            <VStack align="start" spacing="6">
              <Heading as="h1" size="2xl" lineHeight="1.2" color="gray.900">
                Your Health
                <Text
                  as="span"
                  display="block"
                  color="blue.500"
                  fontSize="inherit"
                >
                  Our Responsibility
                </Text>
              </Heading>
            </VStack>

            {/* Right side image */}
            <Box>
              <Image
                src="/api/placeholder/600/500"
                alt="Doctor with laptop"
                w="full"
                h="auto"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box transform="translateY(-100px)">
        <Container maxW="1200px">
          <Card bg="white" shadow="lg" py="8">
            <CardBody>
              <VStack spacing="8">
                <Heading as="h2" size="lg" textAlign="center">
                  Our Best Services
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, lg: 4 }}
                  spacing="6"
                  width="full"
                  px={{ base: 4, md: 8 }}
                >
                  {services.map((service) => (
                    <ServiceCard
                      key={service.title}
                      title={service.title}
                      isSelected={service.isSelected}
                      isProtected={service.isProtected}
                      onClick={() => handleServiceClick(service)}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </Container>
      </Box>

      {/* Auth Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication Required</ModalHeader>
          <ModalBody>
            <Text>
              To access {selectedService?.title}, please sign up or log in to
              your account.
            </Text>
          </ModalBody>
          <ModalFooter gap="3">
            <Button
              variant="outline"
              onClick={() => handleAuthAction('signup')}
              borderColor="#4169E1"
              color="#4169E1"
              _hover={{ bg: 'blue.50' }}
            >
              Sign up
            </Button>
            <Button
              bg="#4169E1"
              color="white"
              onClick={() => handleAuthAction('login')}
              _hover={{ bg: 'blue.600' }}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
