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
  Button,
} from '@chakra-ui/react';
import { Circle, ChevronDown, ChevronUp } from 'lucide-react';

const checkupTopics = [
  {
    id: 'temperature',
    title: 'Check Your Temperature',
    shortContent:
      'Learn how to accurately measure your body temperature and understand what different readings mean.',
    fullContent: `Body temperature measurement is a crucial vital sign check. Normal body temperature typically ranges from 97°F (36.1°C) to 99°F (37.2°C).

    Steps to measure temperature:
    • Use a clean thermometer
    • Place it correctly according to type (oral, armpit, or ear)
    • Wait for the recommended time
    • Read and record the temperature
    • Clean the thermometer after use

    When to be concerned:
    • Adults: Temperature above 103°F (39.4°C)
    • Children: Temperature above 102°F (39°C)
    • Infants: Any fever needs medical attention`,
    tips: [
      'Use a digital thermometer for accuracy',
      'Take temperature at the same time daily if monitoring',
      'Avoid hot/cold foods before oral temperature',
      'Keep a record if monitoring regularly',
    ],
  },
  {
    id: 'blood-pressure',
    title: 'Monitor Blood Pressure',
    shortContent:
      'Understand how to check your blood pressure and what the numbers mean for your health.',
    fullContent: `Blood pressure monitoring is essential for cardiovascular health. A normal blood pressure reading is typically around 120/80 mmHg.

    Steps for accurate measurement:
    • Rest for 5 minutes before measuring
    • Sit with back supported and feet flat
    • Position arm at heart level
    • Take multiple readings
    • Record all measurements

    Understanding readings:
    • Normal: Less than 120/80 mmHg
    • Elevated: 120-129/<80 mmHg
    • High: 130/80 mmHg or higher`,
    tips: [
      'Measure at the same time daily',
      'Avoid caffeine 30 minutes before',
      'Empty bladder before measuring',
      'Take readings from both arms',
    ],
  },
  {
    id: 'pulse',
    title: 'Check Your Pulse Rate',
    shortContent:
      'Learn to measure your heart rate and understand what it indicates about your health.',
    fullContent: `Your pulse rate is an important indicator of heart health. A normal resting heart rate for adults ranges from 60-100 beats per minute.

    How to check pulse:
    • Use your index and middle fingers
    • Press lightly on your wrist or neck
    • Count beats for 30 seconds and multiply by 2
    • Check at the same time daily
    
    Factors affecting pulse:
    • Physical activity
    • Emotions
    • Medications
    • Time of day`,
    tips: [
      'Check pulse when resting',
      'Do not use thumb to check pulse',
      'Record readings regularly',
      'Note any irregular rhythms',
    ],
  },
];

const SelfCheckup = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleContent = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={4}>
            Self Health Checkup Guide
          </Heading>
          <Text color="gray.600">
            Learn how to monitor your vital signs and perform basic health
            checks at home. These self-checkup methods can help you track your
            health and identify potential concerns early.
          </Text>
        </Box>

        <Accordion allowMultiple>
          {checkupTopics.map((topic) => (
            <AccordionItem key={topic.id}>
              <h2>
                <AccordionButton
                  py={4}
                  _expanded={{ bg: 'blue.500', color: 'white' }}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    {topic.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={4}>
                  <Text>
                    {expandedItems[topic.id]
                      ? topic.fullContent
                      : topic.shortContent}
                  </Text>

                  <Button
                    variant="ghost"
                    rightIcon={
                      expandedItems[topic.id] ? <ChevronUp /> : <ChevronDown />
                    }
                    onClick={() => toggleContent(topic.id)}
                    alignSelf="flex-start"
                    size="sm"
                  >
                    {expandedItems[topic.id] ? 'Read Less' : 'Read More'}
                  </Button>

                  {expandedItems[topic.id] && (
                    <Card p={4} bg="blue.50">
                      <Heading size="sm" mb={3}>
                        Key Tips:
                      </Heading>
                      <List spacing={2}>
                        {topic.tips.map((tip, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            alignItems="center"
                          >
                            <ListIcon
                              as={Circle}
                              color="blue.500"
                              fontSize="8px"
                            />
                            <Text>{tip}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Card p={6} bg="gray.50">
          <Text color="red.600" fontWeight="medium">
            Important Note:
          </Text>
          <Text color="gray.600" mt={2}>
            This self-checkup guide is for reference only and should not replace
            professional medical advice. Always consult a healthcare provider
            for proper diagnosis and treatment of medical conditions.
          </Text>
        </Card>
      </VStack>
    </Container>
  );
};

export default SelfCheckup;
