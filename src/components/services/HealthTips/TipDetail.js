import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  Divider,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';

const TipDetail = ({ tip }) => {
  return (
    <Box bg="white" p="6" borderRadius="lg" boxShadow="md">
      <VStack spacing="4" align="stretch">
        <Box fontSize="4xl" textAlign="center">
          {tip.icon}
        </Box>

        <Heading size="lg" textAlign="center">
          {tip.title}
        </Heading>

        <Divider />

        <Text color="gray.600">{tip.content}</Text>

        {tip.benefits && (
          <>
            <Heading size="md" mt="4">
              Benefits
            </Heading>
            <List spacing="3">
              {tip.benefits.map((benefit, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckCircle} color="green.500" />
                  <Text>{benefit}</Text>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default TipDetail;
