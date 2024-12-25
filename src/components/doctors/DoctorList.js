import React, { useEffect, useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  HStack,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useDoctor } from '../../context/DoctorContext';
import DoctorCard from './DoctorCard';
import SpecializationFilter from './SpecializationFilter';
import { DoctorListSkeleton } from '../../components/common/LoadingSkeletons';

const DoctorList = () => {
  const {
    loading,
    error,
    filters,
    updateFilters,
    fetchDoctors,
    getFilteredDoctors,
  } = useDoctor();

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchDoctors();
      setInitialLoad(false);
    };
    loadData();
  }, [fetchDoctors]);

  const filteredDoctors = getFilteredDoctors();

  // Show different loading states for initial load vs. filtering
  if (initialLoad) {
    return (
      <VStack spacing={8} align="stretch">
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={4}>
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                height="24"
                bg="gray.100"
                borderRadius="lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </SimpleGrid>
        </Box>
        <DoctorListSkeleton count={6} />
      </VStack>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={8} bg="white" borderRadius="lg" boxShadow="sm">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="lg" mb={4}>
          Find a Doctor
        </Heading>
        <Text color="gray.600">
          Search through our network of qualified healthcare professionals
        </Text>
      </Box>

      <VStack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search className="text-gray-400" />
          </InputLeftElement>
          <Input
            placeholder="Search by doctor name or specialization"
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          />
        </InputGroup>

        <SpecializationFilter
          value={filters.specialization}
          onChange={(value) => updateFilters({ specialization: value })}
        />

        <HStack spacing={4} alignSelf="flex-end">
          <Select
            value={filters.availability}
            onChange={(e) => updateFilters({ availability: e.target.value })}
            w="200px"
          >
            <option value="all">All Doctors</option>
            <option value="available">Available Today</option>
          </Select>
        </HStack>
      </VStack>

      {loading ? (
        <DoctorListSkeleton count={filteredDoctors.length || 6} />
      ) : filteredDoctors.length === 0 ? (
        <Box
          textAlign="center"
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <Text color="gray.600">No doctors found matching your criteria</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              showAvailability={true}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default DoctorList;
