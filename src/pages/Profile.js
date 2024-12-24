import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Button,
  Avatar,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  List,
  ListItem,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { Calendar, Clock, FileText, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

// Components
const AppointmentCard = ({ appointment }) => (
  <Card variant="outline" mb={4}>
    <CardBody>
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" w="full">
          <Heading size="sm">{appointment.doctorName}</Heading>
          <Badge
            colorScheme={appointment.status === 'upcoming' ? 'green' : 'gray'}
          >
            {appointment.status}
          </Badge>
        </HStack>

        <HStack spacing={4}>
          <HStack>
            <Calendar size={16} />
            <Text>{appointment.date}</Text>
          </HStack>
          <HStack>
            <Clock size={16} />
            <Text>{appointment.time}</Text>
          </HStack>
        </HStack>

        <Text color="gray.600">{appointment.type}</Text>
      </VStack>
    </CardBody>
  </Card>
);

const MedicalReportCard = ({ report }) => (
  <Card variant="outline" mb={4}>
    <CardBody>
      <HStack justify="space-between">
        <VStack align="start" spacing={2}>
          <Heading size="sm">{report.title}</Heading>
          <Text color="gray.600">{report.date}</Text>
        </VStack>
        <Button
          leftIcon={<FileText size={16} />}
          variant="outline"
          colorScheme="blue"
          size="sm"
        >
          Download
        </Button>
      </HStack>
    </CardBody>
  </Card>
);

const ProfilePage = () => {
  const { user } = useAuth();
  const { success } = useNotification();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);

  // Sample data - would come from API in real app
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Miller',
      date: '2024-12-25',
      time: '10:00 AM',
      type: 'General Checkup',
      status: 'upcoming',
    },
    {
      id: 2,
      doctorName: 'Dr. John Wilson',
      date: '2024-12-20',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'completed',
    },
  ];

  const reports = [
    {
      id: 1,
      title: 'Annual Health Checkup Report',
      date: '2024-12-20',
      fileUrl: '/reports/checkup.pdf',
    },
    {
      id: 2,
      title: 'Blood Test Results',
      date: '2024-12-15',
      fileUrl: '/reports/bloodtest.pdf',
    },
  ];

  return (
    <Container maxW="6xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
        {/* Profile Summary */}
        <Card gridColumn={{ base: 'span 1', md: 'span 1' }}>
          <CardBody>
            <VStack spacing={4} align="center">
              <Avatar size="2xl" name={user?.name} src={user?.profilePicture} />
              <VStack spacing={1}>
                <Heading size="md">{user?.name}</Heading>
                <Text color="gray.600">{user?.email}</Text>
                <Badge>{user?.type}</Badge>
              </VStack>
              <Button
                leftIcon={<Edit2 size={16} />}
                variant="outline"
                size="sm"
                w="full"
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Main Content */}
        <Card gridColumn={{ base: 'span 1', md: 'span 3' }}>
          <CardBody>
            <Tabs onChange={setActiveTab} colorScheme="blue">
              <TabList>
                <Tab>Appointments</Tab>
                <Tab>Medical Reports</Tab>
                <Tab>Personal Info</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" mb={4}>
                      Your Appointments
                    </Heading>
                    <AppointmentsList />
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" mb={4}>
                      Medical Reports
                    </Heading>
                    {reports.map((report) => (
                      <MedicalReportCard key={report.id} report={report} />
                    ))}
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Heading size="md">Personal Information</Heading>
                    <List spacing={4}>
                      <ListItem>
                        <Text color="gray.600">Full Name</Text>
                        <Text fontWeight="medium">{user?.name}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Email</Text>
                        <Text fontWeight="medium">{user?.email}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Phone</Text>
                        <Text fontWeight="medium">{user?.phone}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Account Type</Text>
                        <Text fontWeight="medium">{user?.type}</Text>
                      </ListItem>
                    </List>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default ProfilePage;
