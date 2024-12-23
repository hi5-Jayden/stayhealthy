import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { Circle } from 'lucide-react';

const CheckupDetail = ({ data }) => {
  return (
    <Box>
      <VStack align="stretch" spacing="4">
        <Heading size="md">{data.title}</Heading>
        <Text color="gray.600">{data.description}</Text>

        {data.steps && (
          <Box mt="4">
            <Heading size="sm" mb="3">
              Steps to Follow:
            </Heading>
            <List spacing="3">
              {data.steps.map((step, index) => (
                <ListItem key={index} display="flex">
                  <ListIcon as={Circle} color="brand.primary.500" />
                  <Text>{step}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CheckupDetail;
