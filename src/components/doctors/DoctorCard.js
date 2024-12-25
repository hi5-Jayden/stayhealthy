// src/components/doctors/DoctorCard.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Tooltip,
  Skeleton,
} from '@chakra-ui/react';
import { Star, Clock, Calendar } from 'lucide-react';
import { useAvailability } from '../../context/AvailabilityContext';

const DoctorCard = ({ doctor, onBookAppointment, showAvailability = true }) => {
  const { fetchDoctorAvailability, loading } = useAvailability();
  const [availableToday, setAvailableToday] = useState(null);
  const [nextAvailable, setNextAvailable] = useState(null);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!showAvailability) return;

      // Check today's availability
      const today = new Date().toISOString().split('T')[0];
      const todaySlots = await fetchDoctorAvailability(doctor.id, today);
      setAvailableToday(todaySlots.length > 0);

      // If not available today, check next 7 days
      if (todaySlots.length === 0) {
        for (let i = 1; i <= 7; i++) {
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + i);
          const dateStr = nextDate.toISOString().split('T')[0];
          const slots = await fetchDoctorAvailability(doctor.id, dateStr);
          if (slots.length > 0) {
            setNextAvailable(dateStr);
            break;
          }
        }
      }
    };

    checkAvailability();
  }, [doctor.id, fetchDoctorAvailability, showAvailability]);

  const getAvailabilityDisplay = () => {
    if (loading) {
      return <Skeleton height="20px" width="100px" />;
    }
    if (availableToday) {
      return (
        <Badge colorScheme="green" display="flex" alignItems="center" gap={1}>
          <Clock size={12} />
          Available Today
        </Badge>
      );
    }
    if (nextAvailable) {
      return (
        <Tooltip
          label={`Next available on ${new Date(
            nextAvailable
          ).toLocaleDateString()}`}
        >
          <Badge colorScheme="blue" display="flex" alignItems="center" gap={1}>
            <Calendar size={12} />
            Next Available
          </Badge>
        </Tooltip>
      );
    }
    return (
      <Badge colorScheme="red" display="flex" alignItems="center" gap={1}>
        <Clock size={12} />
        Unavailable
      </Badge>
    );
  };

  return (
    <Card
      variant="outline"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      transition="all 0.2s"
    >
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack spacing={4}>
            <Avatar
              size="xl"
              name={doctor.name}
              src={doctor.image || '/api/placeholder/100/100'}
            />
            <VStack align="start" flex={1} spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                {doctor.name}
              </Text>
              <Text color="gray.600">{doctor.specialization}</Text>
              <HStack>
                <Star size={16} fill="gold" stroke="gold" />
                <Text>{doctor.rating.toFixed(1)}</Text>
                <Text color="gray.600">•</Text>
                <Text color="gray.600">{doctor.experience} years exp.</Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack justify="space-between" align="center">
            <Text fontWeight="bold" color="blue.600">
              ${doctor.consultationFee}
            </Text>
            {showAvailability && getAvailabilityDisplay()}
          </HStack>

          <Button
            onClick={() => onBookAppointment(doctor)}
            isDisabled={showAvailability && !availableToday && !nextAvailable}
            bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
            color="white"
            _hover={{ opacity: 0.9 }}
          >
            Book Appointment
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default DoctorCard;
