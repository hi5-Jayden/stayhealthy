import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Card,
  CardBody,
  Avatar,
  Badge,
  Select,
} from '@chakra-ui/react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => (
  <Card variant="outline">
    <CardBody>
      <VStack align="start" spacing="4">
        <HStack spacing="4">
          <Avatar name={review.patientName} src={review.patientImage} />
          <Box>
            <Text fontWeight="500">{review.patientName}</Text>
            <Text fontSize="sm" color="gray.600">
              {review.date}
            </Text>
          </Box>
        </HStack>

        <HStack spacing="2">
          <Badge colorScheme="blue">{review.doctorName}</Badge>
          <Badge colorScheme="purple">{review.serviceType}</Badge>
        </HStack>

        <HStack spacing="1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < review.rating ? 'gold' : 'transparent'}
              stroke={i < review.rating ? 'gold' : 'gray'}
            />
          ))}
          <Text ml="2" fontSize="sm" color="gray.600">
            {review.rating.toFixed(1)}
          </Text>
        </HStack>

        <Text color="gray.700">{review.comment}</Text>
      </VStack>
    </CardBody>
  </Card>
);

const Reviews = () => {
  // Sample review data - in real app, this would come from an API
  const reviews = [
    {
      id: 1,
      patientName: 'John Doe',
      patientImage: '',
      doctorName: 'Dr. Sarah Miller',
      serviceType: 'General Checkup',
      rating: 5,
      date: 'December 15, 2024',
      comment:
        'Excellent service! Dr. Miller was very thorough and professional. Would highly recommend.',
    },
    {
      id: 2,
      patientName: 'Emma Wilson',
      patientImage: '',
      doctorName: 'Dr. John Wilson',
      serviceType: 'Consultation',
      rating: 4.5,
      date: 'December 14, 2024',
      comment:
        'Very good experience. The doctor was knowledgeable and took time to explain everything.',
    },
    // Add more review samples
  ];

  return (
    <Box py="12">
      <Container maxW="1200px">
        {/* Header Section */}
        <VStack spacing="6" mb="12" align="start">
          <Heading size="xl">Patient Reviews</Heading>
          <Text color="gray.600">
            Read what our patients say about their experience with our doctors
            and services.
          </Text>

          {/* Filter Section */}
          <Card w="full" variant="outline">
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
                <Select placeholder="Filter by Doctor">
                  <option value="all">All Doctors</option>
                  <option value="dr-miller">Dr. Sarah Miller</option>
                  <option value="dr-wilson">Dr. John Wilson</option>
                </Select>
                <Select placeholder="Filter by Service">
                  <option value="all">All Services</option>
                  <option value="consultation">Consultation</option>
                  <option value="checkup">General Checkup</option>
                </Select>
                <Select placeholder="Sort by">
                  <option value="recent">Most Recent</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                </Select>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>

        {/* Reviews Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Reviews;
