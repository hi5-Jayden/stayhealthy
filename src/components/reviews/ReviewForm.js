import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Star } from 'lucide-react';

const ReviewForm = ({ onSubmit, appointmentId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: 'Please select a rating',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    if (comment.length < 10) {
      toast({
        title: 'Review must be at least 10 characters',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment, appointmentId });
      toast({
        title: 'Review submitted successfully',
        status: 'success',
        duration: 3000,
      });
      setRating(0);
      setComment('');
    } catch (error) {
      toast({
        title: 'Failed to submit review',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
      <Box>
        <Text mb={2}>Rate your experience:</Text>
        <HStack spacing={1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box
              key={star}
              cursor="pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={24}
                fill={star <= (hover || rating) ? 'gold' : 'transparent'}
                stroke={star <= (hover || rating) ? 'gold' : 'gray'}
              />
            </Box>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text mb={2}>Your review:</Text>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          minH="100px"
          resize="vertical"
        />
      </Box>

      <Button
        type="submit"
        isLoading={isSubmitting}
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
      >
        Submit Review
      </Button>
    </VStack>
  );
};

export default ReviewForm;
