import React from 'react';
import {
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';

const CheckupList = () => {
  const checkupItems = [
    {
      title: 'Check Your Temperature',
      content:
        'Checking your temperature can help you monitor your health and detect fever or other potential illnesses. It is essential to use an accurate thermometer and follow the proper procedure for measuring body temperature.',
    },
    {
      title: 'Check Your Blood Pressure',
      content:
        'Regular blood pressure monitoring is crucial for maintaining cardiovascular health. Normal blood pressure is typically around 120/80 mmHg.',
    },
    {
      title: 'Check Your BMI',
      content:
        'Body Mass Index (BMI) is a measure of body fat based on height and weight. A healthy BMI typically ranges from 18.5 to 24.9.',
    },
  ];

  return (
    <VStack spacing="6" align="stretch">
      <Box mb="6">
        <Heading size="lg" mb="4">
          Self Health Checkup
        </Heading>
        <Text color="gray.600">
          Self-health checkup is an essential practice that empowers individuals
          to take charge of their well-being. Monitor your vital signs and
          health indicators regularly to maintain optimal health.
        </Text>
      </Box>

      <Accordion allowToggle>
        {checkupItems.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton
                py="4"
                _expanded={{
                  bg: 'brand.primary.500',
                  color: 'white',
                }}
              >
                <Box flex="1" textAlign="left">
                  {item.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="gray.600">{item.content}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};

export default CheckupList;
