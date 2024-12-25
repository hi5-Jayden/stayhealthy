// src/components/doctors/DoctorReviews.js
import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Star, MessageCircle } from 'lucide-react';
import ReviewsList from '../reviews/ReviewsList';
import ReviewForm from '../reviews/ReviewForm';
import { useAuth } from '../../context/AuthContext';

const RatingBreakdown = ({ ratings }) => {
  const totalReviews = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <VStack align="stretch" spacing={2}>
      {[5, 4, 3, 2, 1].map((rating) => (
        <HStack key={rating} spacing={4}>
          <Text w="60px">{rating} stars</Text>
          <Progress
            value={((ratings[rating] || 0) / totalReviews) * 100}
            flex={1}
            colorScheme={rating > 3 ? 'green' : rating === 3 ? 'yellow' : 'red'}
          />
          <Text w="60px" textAlign="right">
            {ratings[rating] || 0}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

const RatingSummary = ({ averageRating, totalReviews }) => {
  return (
    <HStack spacing={8} align="start">
      <VStack spacing={2} align="center" minW="150px">
        <Heading size="2xl">{averageRating.toFixed(1)}</Heading>
        <HStack>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              fill={i < Math.round(averageRating) ? 'gold' : 'transparent'}
              stroke={i < Math.round(averageRating) ? 'gold' : 'gray'}
            />
          ))}
        </HStack>
        <Text color="gray.600">
          Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </Text>
      </VStack>
      <Box flex={1}>
        <RatingBreakdown
          ratings={{
            5: Math.floor(totalReviews * 0.5),
            4: Math.floor(totalReviews * 0.3),
            3: Math.floor(totalReviews * 0.1),
            2: Math.floor(totalReviews * 0.07),
            1: Math.floor(totalReviews * 0.03),
          }}
        />
      </Box>
    </HStack>
  );
};

const DoctorReviews = ({ doctorId, doctorName }) => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // In a real app, these would come from an API
  const reviewStats = {
    averageRating: 4.5,
    totalReviews: 128,
    recentMonthStats: {
      total: 24,
      average: 4.7,
      trend: 'up',
    },
  };

  return (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat>
          <StatLabel>Average Rating</StatLabel>
          <StatNumber>{reviewStats.averageRating.toFixed(1)}</StatNumber>
          <HStack>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={
                  i < Math.round(reviewStats.averageRating)
                    ? 'gold'
                    : 'transparent'
                }
                stroke={
                  i < Math.round(reviewStats.averageRating) ? 'gold' : 'gray'
                }
              />
            ))}
          </HStack>
        </Stat>
        <Stat>
          <StatLabel>Total Reviews</StatLabel>
          <StatNumber>{reviewStats.totalReviews}</StatNumber>
          <StatHelpText>Lifetime reviews</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Recent Month</StatLabel>
          <StatNumber>
            {reviewStats.recentMonthStats.average.toFixed(1)}
          </StatNumber>
          <StatHelpText>
            Based on {reviewStats.recentMonthStats.total} reviews
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Divider />

      <RatingSummary
        averageRating={reviewStats.averageRating}
        totalReviews={reviewStats.totalReviews}
      />

      {isAuthenticated && (
        <Button
          leftIcon={<MessageCircle size={16} />}
          colorScheme="blue"
          alignSelf="flex-start"
          onClick={onOpen}
        >
          Write a Review
        </Button>
      )}

      {/* Reviews List */}
      <ReviewsList doctorId={doctorId} showForm={false} />

      {/* Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review Dr. {doctorName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ReviewForm
              doctorId={doctorId}
              onSubmit={async (reviewData) => {
                // Handle review submission
                onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default DoctorReviews;
