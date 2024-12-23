import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Circle, CheckCircle } from 'lucide-react';

const checkupCategories = [
  {
    id: 'temperature',
    title: 'Check Your Temperature',
    content:
      'Checking your temperature can help you monitor your health and detect fever or other potential illnesses. It is essential to use an accurate thermometer and follow the proper procedure for measuring body temperature.',
    steps: [
      'Use a clean thermometer',
      'Place it correctly according to type',
      'Wait for the recommended time',
      'Read and record the temperature',
      'Clean the thermometer after use',
    ],
    normalRange: '36.1°C to 37.2°C (97°F to 99°F)',
  },
  {
    id: 'blood-pressure',
    title: 'Check Your Blood Pressure',
    content:
      'Regular blood pressure monitoring is crucial for maintaining cardiovascular health. Use a reliable blood pressure monitor and follow proper measurement techniques.',
    steps: [
      'Sit quietly for 5 minutes before measuring',
      'Keep feet flat on the floor',
      'Rest arm at heart level',
      'Take multiple readings',
      'Record the results',
    ],
    normalRange: 'Systolic: <120 mmHg, Diastolic: <80 mmHg',
  },
  {
    id: 'bmi',
    title: 'Check Your BMI',
    content:
      'Body Mass Index (BMI) helps assess if you are at a healthy weight for your height. While not perfect, it is a useful screening tool.',
    steps: [
      'Measure your weight accurately',
      'Measure your height accurately',
      'Use BMI calculator or formula',
      'Interpret results with other factors',
      'Consult healthcare provider if concerned',
    ],
    normalRange: '18.5 to 24.9',
  },
];

const SelfCheckup = () => {
  const [expandedIndex, setExpandedIndex] = useState([]);

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={4}>
            Self Health Checkup
          </Heading>
          <Text color="gray.600">
            Regular self-health checkups help you monitor your well-being and
            identify potential health concerns early. Follow these guidelines
            for basic health monitoring at home.
          </Text>
        </Box>

        <Accordion allowMultiple onChange={(index) => setExpandedIndex(index)}>
          {checkupCategories.map((category, idx) => (
            <AccordionItem key={category.id}>
              <h2>
                <AccordionButton
                  py={4}
                  _expanded={{
                    bg: 'blue.500',
                    color: 'white',
                  }}
                >
                  <Box flex="1" textAlign="left">
                    {category.title}
                    {expandedIndex.includes(idx) && (
                      <Box as="span" ml={2}>
                        <CheckCircle size={16} />
                      </Box>
                    )}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={4}>
                  <Text color="gray.600">{category.content}</Text>

                  <Card variant="outline">
                    <CardBody>
                      <Text fontWeight="medium" mb={2}>
                        Steps to Follow:
                      </Text>
                      <List spacing={2}>
                        {category.steps.map((step, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            alignItems="center"
                          >
                            <ListIcon as={Circle} color="blue.500" />
                            <Text>{step}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </CardBody>
                  </Card>

                  <Box>
                    <Text fontWeight="medium">Normal Range:</Text>
                    <Text color="blue.600">{category.normalRange}</Text>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Card>
          <CardBody>
            <Text fontWeight="medium" color="red.500">
              Important Note:
            </Text>
            <Text color="gray.600" mt={2}>
              This self-checkup guide is for reference only. Always consult a
              healthcare professional for proper medical advice and diagnosis.
            </Text>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default SelfCheckup;
