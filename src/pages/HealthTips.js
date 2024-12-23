import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  Search,
  Droplet,
  Apple,
  ActivitySquare,
  Moon,
  CheckCircle,
} from 'lucide-react';

const healthTips = [
  {
    id: 'hydration',
    title: 'Stay Hydrated',
    icon: Droplet,
    description:
      'Drink plenty of water throughout the day to keep your body hydrated and maintain optimal bodily functions.',
    category: 'Daily Habits',
    benefits: [
      'Improves digestion',
      'Regulates body temperature',
      'Enhances nutrient absorption',
      'Boosts energy levels',
      'Maintains skin health',
    ],
    recommendations: [
      'Drink 8-10 glasses of water daily',
      'Start your day with a glass of water',
      'Keep a water bottle handy',
      'Monitor urine color for hydration',
      'Increase intake during exercise',
    ],
  },
  {
    id: 'diet',
    title: 'Eat a Balanced Diet',
    icon: Apple,
    description:
      'Consume a variety of nutrient-rich foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats.',
    category: 'Nutrition',
    benefits: [
      'Maintains healthy weight',
      'Provides essential nutrients',
      'Supports immune system',
      'Improves heart health',
      'Enhances mental clarity',
    ],
    recommendations: [
      'Include colorful vegetables',
      'Choose whole grain options',
      'Limit processed foods',
      'Control portion sizes',
      'Eat mindfully and slowly',
    ],
  },
  {
    id: 'exercise',
    title: 'Exercise Regularly',
    icon: ActivitySquare,
    description:
      'Engage in regular physical activity to boost cardiovascular health, strengthen muscles, and improve overall well-being.',
    category: 'Fitness',
    benefits: [
      'Strengthens heart health',
      'Builds muscle strength',
      'Reduces stress levels',
      'Improves sleep quality',
      'Boosts mood and energy',
    ],
    recommendations: [
      '150 minutes moderate activity weekly',
      'Mix cardio and strength training',
      'Start slowly and progress gradually',
      'Find activities you enjoy',
      'Stay consistent with routine',
    ],
  },
  {
    id: 'sleep',
    title: 'Get Adequate Sleep',
    icon: Moon,
    description:
      'Prioritize quality sleep to rejuvenate your body and mind. Most adults require 7-9 hours of sleep per night.',
    category: 'Rest',
    benefits: [
      'Enhances memory',
      'Repairs body tissues',
      'Strengthens immunity',
      'Regulates metabolism',
      'Improves concentration',
    ],
    recommendations: [
      'Maintain consistent sleep schedule',
      'Create relaxing bedtime routine',
      'Optimize sleep environment',
      'Limit screen time before bed',
      'Avoid caffeine late in day',
    ],
  },
];

const HealthTipCard = ({ tip, onClick }) => (
  <Card
    cursor="pointer"
    onClick={() => onClick(tip)}
    _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
    transition="all 0.2s"
  >
    <CardBody>
      <VStack spacing={4} align="start">
        <Box color="blue.500">
          <tip.icon size={32} />
        </Box>
        <VStack align="start" spacing={2}>
          <Heading size="md">{tip.title}</Heading>
          <Text color="gray.600" noOfLines={3}>
            {tip.description}
          </Text>
          <Tag colorScheme="blue" size="sm">
            {tip.category}
          </Tag>
        </VStack>
      </VStack>
    </CardBody>
  </Card>
);

const HealthTips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredTips = healthTips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
    onOpen();
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={4}>
            Health Tips and Guidance
          </Heading>
          <Text color="gray.600">
            Discover practical tips and guidance for maintaining a healthy
            lifestyle.
          </Text>
        </Box>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search className="text-gray-400" />
          </InputLeftElement>
          <Input
            placeholder="Search health tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {filteredTips.map((tip) => (
            <HealthTipCard key={tip.id} tip={tip} onClick={handleTipClick} />
          ))}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedTip?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="stretch" spacing={4}>
                <Text>{selectedTip?.description}</Text>

                <Box>
                  <Heading size="sm" mb={2}>
                    Benefits:
                  </Heading>
                  <List spacing={2}>
                    {selectedTip?.benefits.map((benefit, index) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <ListIcon as={CheckCircle} color="green.500" />
                        <Text>{benefit}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Heading size="sm" mb={2}>
                    Recommendations:
                  </Heading>
                  <List spacing={2}>
                    {selectedTip?.recommendations.map((rec, index) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <ListIcon as={CheckCircle} color="blue.500" />
                        <Text>{rec}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default HealthTips;
