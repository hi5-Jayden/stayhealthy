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
  IconButton,
  ButtonGroup,
  Tooltip,
} from '@chakra-ui/react';
import {
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { ReviewListSkeleton } from '../../components/common/LoadingSkeletons';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const ITEMS_PER_PAGE = 6;

const PaginationButton = ({ icon: Icon, label, ...props }) => (
  <Tooltip label={label}>
    <IconButton
      icon={<Icon size={16} />}
      variant="outline"
      aria-label={label}
      {...props}
    />
  </Tooltip>
);

const ReviewsList = ({ doctorId, showForm = true }) => {
  const [loading, setLoading] = useState(true);
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
    // ... more sample reviews
  ]);

  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitReview = async (reviewData) => {
    const newReview = {
      id: Date.now(),
      patientName: 'Current User',
      date: new Date().toISOString(),
      ...reviewData,
    };

    setReviews((prev) => [newReview, ...prev]);
    setCurrentPage(1); // Reset to first page when adding new review
  };

  // Simulate loading state
  React.useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load reviews:', error);
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

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
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
    window.scrollTo(0, 0);
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRating, sortBy]);

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
          <Heading size="md">Reviews ({filteredReviews.length})</Heading>
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

        {loading ? (
          <ReviewListSkeleton count={6} />
        ) : filteredReviews.length === 0 ? (
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
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {paginatedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </SimpleGrid>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <HStack justify="center" spacing={2} mt={6}>
                <ButtonGroup variant="outline" spacing={2}>
                  <PaginationButton
                    icon={ChevronsLeft}
                    onClick={() => handlePageChange(1)}
                    isDisabled={currentPage === 1}
                    label="First page"
                  />
                  <PaginationButton
                    icon={ChevronLeft}
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    label="Previous page"
                  />

                  <HStack spacing={1}>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show current page and one page before/after
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 1
                      ) {
                        return (
                          <Button
                            key={pageNumber}
                            variant={
                              pageNumber === currentPage ? 'solid' : 'outline'
                            }
                            colorScheme={
                              pageNumber === currentPage ? 'blue' : 'gray'
                            }
                            onClick={() => handlePageChange(pageNumber)}
                            size="sm"
                          >
                            {pageNumber}
                          </Button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <Text key={pageNumber} color="gray.500">
                            ...
                          </Text>
                        );
                      }
                      return null;
                    })}
                  </HStack>

                  <PaginationButton
                    icon={ChevronRight}
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    label="Next page"
                  />
                  <PaginationButton
                    icon={ChevronsRight}
                    onClick={() => handlePageChange(totalPages)}
                    isDisabled={currentPage === totalPages}
                    label="Last page"
                  />
                </ButtonGroup>
              </HStack>
            )}
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default ReviewsList;
