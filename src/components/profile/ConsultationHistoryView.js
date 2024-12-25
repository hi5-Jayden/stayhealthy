import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Badge,
  Select,
  Button,
  Avatar,
  Divider,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import {
  Search,
  Clock,
  Calendar,
  MoreVertical,
  FileText,
  MessageCircle,
  Star,
} from 'lucide-react';

// Sample consultation data
const sampleConsultations = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Miller',
    doctorSpecialty: 'Cardiologist',
    date: '2024-12-20',
    time: '10:00 AM',
    type: 'Video Consultation',
    status: 'completed',
    duration: '30 mins',
    diagnosis: 'Regular heart checkup',
    prescription: true,
    followUp: '3 months',
    rating: 5,
  },
  {
    id: 2,
    doctorName: 'Dr. John Wilson',
    doctorSpecialty: 'Dermatologist',
    date: '2024-12-15',
    time: '2:30 PM',
    type: 'Chat Consultation',
    status: 'completed',
    duration: '20 mins',
    diagnosis: 'Skin allergy',
    prescription: true,
    followUp: '2 weeks',
    rating: 4,
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Chen',
    doctorSpecialty: 'General Physician',
    date: '2024-12-25',
    time: '3:00 PM',
    type: 'Video Consultation',
    status: 'scheduled',
    duration: 'N/A',
    diagnosis: null,
    prescription: false,
    followUp: null,
    rating: null,
  },
];

const ConsultationCard = ({ consultation }) => {
  const toast = useToast();
  const isUpcoming = consultation.status === 'scheduled';

  const handleViewPrescription = () => {
    toast({
      title: 'Opening Prescription',
      description: 'Prescription viewer will be implemented soon',
      status: 'info',
      duration: 3000,
    });
  };

  const handleBookFollowUp = () => {
    toast({
      title: 'Booking Follow-up',
      description: 'Follow-up booking will be implemented soon',
      status: 'info',
      duration: 3000,
    });
  };

  return (
    <Card variant="outline" mb={4}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          {/* Header */}
          <HStack justify="space-between">
            <HStack spacing={4}>
              <Avatar name={consultation.doctorName} size="md" />
              <Box>
                <Text fontWeight="bold">{consultation.doctorName}</Text>
                <Text color="gray.600" fontSize="sm">
                  {consultation.doctorSpecialty}
                </Text>
              </Box>
            </HStack>
            <Badge colorScheme={isUpcoming ? 'blue' : 'green'} fontSize="sm">
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </Badge>
          </HStack>

          <Divider />

          {/* Details */}
          <HStack spacing={6} flexWrap="wrap">
            <HStack>
              <Calendar size={16} />
              <Text fontSize="sm">
                {new Date(consultation.date).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Clock size={16} />
              <Text fontSize="sm">{consultation.time}</Text>
            </HStack>
            <Badge variant="outline" colorScheme="blue">
              {consultation.type}
            </Badge>
            {consultation.duration !== 'N/A' && (
              <Text fontSize="sm" color="gray.600">
                Duration: {consultation.duration}
              </Text>
            )}
          </HStack>

          {/* Consultation Info */}
          {!isUpcoming && (
            <>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Diagnosis:
                </Text>
                <Text color="gray.600">{consultation.diagnosis}</Text>
              </Box>

              {consultation.rating && (
                <HStack>
                  <Text fontWeight="medium">Rating:</Text>
                  <HStack>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={
                          index < consultation.rating ? 'gold' : 'transparent'
                        }
                        stroke={index < consultation.rating ? 'gold' : 'gray'}
                      />
                    ))}
                  </HStack>
                </HStack>
              )}
            </>
          )}

          {/* Actions */}
          <HStack justify="flex-end" spacing={3}>
            {consultation.prescription && (
              <Button
                leftIcon={<FileText size={16} />}
                size="sm"
                variant="outline"
                onClick={handleViewPrescription}
              >
                View Prescription
              </Button>
            )}
            {consultation.followUp && !isUpcoming && (
              <Button
                leftIcon={<MessageCircle size={16} />}
                size="sm"
                colorScheme="blue"
                onClick={handleBookFollowUp}
              >
                Book Follow-up
              </Button>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ConsultationHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort consultations
  const filteredConsultations = sampleConsultations
    .filter((consultation) => {
      const matchesSearch =
        consultation.doctorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        consultation.doctorSpecialty
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        consultation.diagnosis
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'upcoming' && consultation.status === 'scheduled') ||
        (filter === 'completed' && consultation.status === 'completed');

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'doctor':
          return a.doctorName.localeCompare(b.doctorName);
        default:
          return 0;
      }
    });

  return (
    <VStack align="stretch" spacing={6}>
      {/* Filters and Search */}
      <HStack spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement>
            <Search size={18} className="text-gray-400" />
          </InputLeftElement>
          <Input
            placeholder="Search consultations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          w="200px"
        >
          <option value="all">All Consultations</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </Select>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          w="200px"
        >
          <option value="date">Sort by Date</option>
          <option value="doctor">Sort by Doctor</option>
        </Select>
      </HStack>

      {/* Consultations List */}
      {filteredConsultations.length === 0 ? (
        <Card variant="outline">
          <CardBody>
            <Text color="gray.600" textAlign="center">
              No consultations found
            </Text>
          </CardBody>
        </Card>
      ) : (
        filteredConsultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))
      )}
    </VStack>
  );
};

export default ConsultationHistoryView;
