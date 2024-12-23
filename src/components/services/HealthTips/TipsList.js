import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import TipCard from './TipCard';

const TipsList = () => {
  const tips = [
    {
      title: 'Stay Hydrated',
      content:
        'Drink plenty of water throughout the day to keep your body hydrated and maintain optimal bodily functions. Water helps with digestion, circulation, temperature regulation, and more.',
      icon: '💧',
    },
    {
      title: 'Eat a Balanced Diet',
      content:
        'Consume a variety of nutrient-rich foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats. A balanced diet provides essential nutrients and helps maintain overall health.',
      icon: '🥗',
    },
    {
      title: 'Exercise Regularly',
      content:
        'Engage in regular physical activity to boost cardiovascular health, strengthen muscles, improve flexibility, manage weight, and enhance overall well-being. Aim for at least 150 minutes of moderate-intensity exercise per week.',
      icon: '🏃',
    },
    {
      title: 'Get Adequate Sleep',
      content:
        'Prioritize quality sleep to rejuvenate your body and mind. Most adults require 7-9 hours of sleep per night. Establish a consistent sleep schedule and create a relaxing sleep environment.',
      icon: '😴',
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
      {tips.map((tip, index) => (
        <TipCard key={index} {...tip} />
      ))}
    </SimpleGrid>
  );
};

export default TipsList;
