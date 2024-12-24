import React, { useState } from 'react';
import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { Search, Star } from 'lucide-react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const ReviewsList = ({ doctorId, showForm = true }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      rating: 5,
      comment:
        'Excellent service! The doctor was very professional and thorough.',
      date: '2024-12-20',
      doctorName: 'Dr. Sarah Miller',
      appointmentType: 'General Checkup',
    },
    {
      id: 2,
      patientName: 'Emma Wilson',
      rating: 4,
      comment: 'Very good experience. Would recommend!',
      date: '2024-12-18',
      doctorName: 'Dr. Sarah Miller',
      appointmentType: 'Consultation',
    },
  ]);

  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitReview = async (reviewData) => {
    // In a real app, this would make an API call
    const newReview = {
      id: Date.now(),
      patientName: 'Current User', // Would come from auth context
      date: new Date().toISOString(),
      ...reviewData,
    };

    setReviews((prev) => [newReview, ...prev]);
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply rating filter
    if (filterRating !== 'all') {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredReviews = getFilteredAndSortedReviews();

  return (
    <VStack spacing={6} align="stretch" w="full">
      {showForm && (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Heading size="md" mb={4}>
            Write a Review
          </Heading>
          <ReviewForm onSubmit={handleSubmitReview} />
        </Box>
      )}

      <Box>
        <HStack justify="space-between" mb={6}>
          <Heading size="md">Reviews ({reviews.length})</Heading>
          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement>
                <Search className="text-gray-400" />
              </InputLeftElement>
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              w="150px"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </Select>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              w="150px"
            >
              <option value="recent">Most Recent</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
            </Select>
          </HStack>
        </HStack>

        {filteredReviews.length === 0 ? (
          <Box
            textAlign="center"
            py={8}
            px={6}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
          >
            <Text color="gray.600">No reviews found</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </VStack>
  );
};

export default ReviewsList;
