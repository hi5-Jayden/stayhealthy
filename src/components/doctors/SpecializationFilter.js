import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Image,
  SimpleGrid,
  useRadioGroup,
  useTheme,
  Circle,
} from '@chakra-ui/react';
import { Check } from 'lucide-react';

// Custom Radio Card Component
const SpecializationCard = ({ name, icon, isSelected, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="white"
      position="relative"
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      _hover={{
        borderColor: 'blue.500',
        transform: 'translateY(-2px)',
        boxShadow: 'sm',
      }}
      transition="all 0.2s"
    >
      {isSelected && (
        <Circle
          size="20px"
          bg="blue.500"
          color="white"
          position="absolute"
          top={2}
          right={2}
        >
          <Check size={12} />
        </Circle>
      )}

      <VStack spacing={3} align="center">
        <Image src={`/api/placeholder/48/48`} alt={name} boxSize="48px" />
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={isSelected ? 'blue.500' : 'gray.700'}
          textAlign="center"
        >
          {name}
        </Text>
      </VStack>
    </Box>
  );
};

const SpecializationFilter = ({ value, onChange }) => {
  // Specializations data
  const specializations = [
    { id: 'all', name: 'All Specialties', icon: 'spec-all.svg' },
    { id: 'cardio', name: 'Cardiology', icon: 'spec-cardiology.svg' },
    { id: 'derm', name: 'Dermatology', icon: 'spec-dermatology.svg' },
    { id: 'pedia', name: 'Pediatrics', icon: 'spec-pediatrics.svg' },
    { id: 'neuro', name: 'Neurology', icon: 'spec-neurology.svg' },
    { id: 'ortho', name: 'Orthopedics', icon: 'spec-orthopedics.svg' },
    { id: 'gyn', name: 'Gynecology', icon: 'spec-gynecology.svg' },
    { id: 'psych', name: 'Psychiatry', icon: 'spec-psychiatry.svg' },
    { id: 'gp', name: 'General', icon: 'spec-general.svg' },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'specialization',
    value,
    onChange,
  });

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
        spacing={4}
        {...getRootProps()}
      >
        {specializations.map((spec) => {
          const radio = getRadioProps({ value: spec.id });
          return (
            <SpecializationCard
              key={spec.id}
              name={spec.name}
              icon={spec.icon}
              isSelected={value === spec.id}
              onClick={() => onChange(spec.id)}
              {...radio}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SpecializationFilter;
