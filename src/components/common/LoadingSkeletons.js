import React from 'react';
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  HStack,
  VStack,
} from '@chakra-ui/react';

export const DoctorCardSkeleton = () => (
  <Box
    padding="6"
    boxShadow="sm"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
  >
    <HStack spacing="4" align="start">
      <SkeletonCircle size="16" />
      <VStack align="start" flex="1" spacing="4">
        <Skeleton height="6" width="60%" />
        <Skeleton height="4" width="40%" />
        <HStack spacing="4">
          <Skeleton height="4" width="20" />
          <Skeleton height="4" width="24" />
        </HStack>
      </VStack>
    </HStack>
    <VStack mt="6" spacing="4">
      <Skeleton height="4" width="30%" />
      <Skeleton height="10" width="full" />
    </VStack>
  </Box>
);

export const DoctorListSkeleton = ({ count = 6 }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
    {[...Array(count)].map((_, i) => (
      <DoctorCardSkeleton key={i} />
    ))}
  </SimpleGrid>
);

export const ReviewCardSkeleton = () => (
  <Box
    padding="6"
    boxShadow="sm"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
  >
    <HStack spacing="4" mb="4">
      <SkeletonCircle size="10" />
      <VStack align="start" flex="1">
        <Skeleton height="5" width="40%" />
        <Skeleton height="4" width="30%" />
      </VStack>
      <Skeleton height="6" width="24" />
    </HStack>
    <SkeletonText mt="4" noOfLines={3} spacing="4" />
  </Box>
);

export const ReviewListSkeleton = ({ count = 6 }) => (
  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
    {[...Array(count)].map((_, i) => (
      <ReviewCardSkeleton key={i} />
    ))}
  </SimpleGrid>
);

export const ProfileSkeleton = () => (
  <Box
    padding="6"
    boxShadow="sm"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
  >
    <VStack spacing="6" align="center">
      <SkeletonCircle size="24" />
      <VStack spacing="4" width="full">
        <Skeleton height="6" width="50%" />
        <Skeleton height="4" width="30%" />
        <Skeleton height="4" width="40%" />
      </VStack>
      <Skeleton height="10" width="full" />
    </VStack>
  </Box>
);

export const AppointmentCardSkeleton = () => (
  <Box
    padding="6"
    boxShadow="sm"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
  >
    <VStack align="stretch" spacing="4">
      <HStack justify="space-between">
        <Skeleton height="6" width="40%" />
        <Skeleton height="6" width="20%" />
      </HStack>
      <HStack spacing="6">
        <Skeleton height="4" width="30%" />
        <Skeleton height="4" width="30%" />
      </HStack>
      <Skeleton height="4" width="60%" />
      <HStack justify="flex-end" spacing="2">
        <Skeleton height="10" width="24" />
        <Skeleton height="10" width="24" />
      </HStack>
    </VStack>
  </Box>
);

export const MedicalReportSkeleton = () => (
  <Box
    padding="6"
    boxShadow="sm"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
  >
    <VStack align="stretch" spacing="4">
      <HStack>
        <Box w="8">
          <Skeleton height="8" width="8" />
        </Box>
        <VStack align="start" flex="1" spacing="2">
          <Skeleton height="6" width="60%" />
          <Skeleton height="4" width="40%" />
        </VStack>
      </HStack>
      <HStack spacing="4">
        <Skeleton height="4" width="30%" />
        <Skeleton height="4" width="30%" />
      </HStack>
      <HStack justify="flex-end" spacing="2">
        <Skeleton height="10" width="24" />
        <Skeleton height="10" width="24" />
      </HStack>
    </VStack>
  </Box>
);

export const ChatMessageSkeleton = ({ isUser = false }) => (
  <HStack
    align="start"
    justify={isUser ? 'flex-end' : 'flex-start'}
    w="full"
    spacing="4"
  >
    {!isUser && <SkeletonCircle size="8" />}
    <Box
      maxW="70%"
      bg={isUser ? 'blue.50' : 'gray.50'}
      p="4"
      borderRadius="lg"
      borderTopLeftRadius={!isUser ? '0' : 'lg'}
      borderTopRightRadius={isUser ? '0' : 'lg'}
    >
      <SkeletonText noOfLines={2} spacing="4" />
    </Box>
    {isUser && <SkeletonCircle size="8" />}
  </HStack>
);

export const ChatInterfaceSkeleton = () => (
  <VStack h="full" spacing="4" p="4">
    <Box w="full">
      <HStack spacing="4" p="4" bg="white" borderRadius="lg" boxShadow="sm">
        <SkeletonCircle size="12" />
        <VStack align="start" flex="1" spacing="2">
          <Skeleton height="5" width="40%" />
          <Skeleton height="4" width="30%" />
        </VStack>
        <Skeleton height="6" width="24" />
      </HStack>
    </Box>

    <VStack flex="1" w="full" spacing="4" bg="gray.50" p="4" borderRadius="md">
      <ChatMessageSkeleton />
      <ChatMessageSkeleton isUser />
      <ChatMessageSkeleton />
    </VStack>

    <HStack w="full" spacing="2">
      <Skeleton height="10" width="10" />
      <Skeleton height="10" flex="1" />
      <Skeleton height="10" width="10" />
    </HStack>
  </VStack>
);
