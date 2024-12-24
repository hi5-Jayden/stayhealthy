import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Select,
  Card,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import AppointmentRescheduleModal from './AppointmentRescheduleModal';
import { useNotification } from '../../context/NotificationContext';

const AppointmentCard = ({ appointment, onCancel, onReschedule }) => {
  const isUpcoming = new Date(appointment.date) > new Date();
  const cancelModal = useDisclosure();
  const rescheduleModal = useDisclosure();

  const handleCancel = () => {
    onCancel(appointment.id);
    cancelModal.onClose();
  };

  const handleReschedule = (updatedAppointment) => {
    onReschedule(updatedAppointment);
    rescheduleModal.onClose();
  };

  return (
    <>
      <Card variant="outline" mb={4}>
        <CardBody>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontWeight="bold">{appointment.doctorName}</Text>
              <Badge colorScheme={isUpcoming ? 'green' : 'gray'}>
                {isUpcoming ? 'Upcoming' : 'Past'}
              </Badge>
            </HStack>

            <HStack spacing={6}>
              <HStack>
                <Calendar size={16} />
                <Text>{new Date(appointment.date).toLocaleDateString()}</Text>
              </HStack>
              <HStack>
                <Clock size={16} />
                <Text>{appointment.time}</Text>
              </HStack>
            </HStack>

            <Text color="gray.600">{appointment.type}</Text>

            {isUpcoming && (
              <HStack justify="flex-end" spacing={2}>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={rescheduleModal.onOpen}
                >
                  Reschedule
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={cancelModal.onOpen}
                >
                  Cancel
                </Button>
              </HStack>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal isOpen={cancelModal.isOpen} onClose={cancelModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Appointment</ModalHeader>
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <HStack color="red.500">
                <AlertCircle />
                <Text fontWeight="medium">Are you sure?</Text>
              </HStack>
              <Text color="gray.600">
                This will cancel your appointment with {appointment.doctorName}{' '}
                on {new Date(appointment.date).toLocaleDateString()} at{' '}
                {appointment.time}.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter gap="3">
            <Button variant="outline" onClick={cancelModal.onClose}>
              Keep Appointment
            </Button>
            <Button colorScheme="red" onClick={handleCancel}>
              Cancel Appointment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={rescheduleModal.isOpen}
        onClose={rescheduleModal.onClose}
        appointment={appointment}
        onReschedule={handleReschedule}
      />
    </>
  );
};

const AppointmentsList = () => {
  const { success } = useNotification();
  const [filter, setFilter] = useState('all');

  // Sample data - would come from API/context in real app
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Miller',
      date: '2024-12-25',
      time: '10:00 AM',
      type: 'General Checkup',
    },
    {
      id: 2,
      doctorName: 'Dr. John Wilson',
      date: '2024-12-20',
      time: '2:30 PM',
      type: 'Follow-up',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Chen',
      date: '2024-11-15',
      time: '11:00 AM',
      type: 'Consultation',
    },
  ]);

  const handleCancelAppointment = (appointmentId) => {
    // In real app, would make API call here
    setAppointments(appointments.filter((app) => app.id !== appointmentId));
    success('Appointment cancelled successfully');
  };

  const handleRescheduleAppointment = (updatedAppointment) => {
    // In real app, would make API call here
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === updatedAppointment.id ? updatedAppointment : app
      )
    );
    success('Appointment rescheduled successfully');
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const isUpcoming = new Date(appointment.date) > new Date();
    if (filter === 'upcoming') return isUpcoming;
    if (filter === 'past') return !isUpcoming;
    return true;
  });

  return (
    <VStack align="stretch" spacing={4}>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        w="200px"
      >
        <option value="all">All Appointments</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </Select>

      {filteredAppointments.length === 0 ? (
        <Card variant="outline">
          <CardBody>
            <Text color="gray.600" textAlign="center">
              No {filter !== 'all' ? filter : ''} appointments found.
            </Text>
          </CardBody>
        </Card>
      ) : (
        filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={handleCancelAppointment}
            onReschedule={handleRescheduleAppointment}
          />
        ))
      )}
    </VStack>
  );
};

export default AppointmentsList;
