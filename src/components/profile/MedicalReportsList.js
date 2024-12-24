import React, { useState } from 'react';
import PDFPreviewModal from './PDFPreviewModal';
import {
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Button,
  Badge,
  Select,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { Search, FileText, Download, Calendar } from 'lucide-react';

const ReportCard = ({ report }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDownload = async () => {
    try {
      // In a real app, this would make an API call to download the file
      toast({
        title: 'Download started',
        description: 'Your report is being downloaded...',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Unable to download the report. Please try again.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Card variant="outline" mb={4}>
        <CardBody>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <HStack
                onClick={onOpen}
                cursor="pointer"
                _hover={{ color: 'blue.500' }}
              >
                <FileText size={20} className="text-blue-500" />
                <Text fontWeight="bold">{report.title}</Text>
              </HStack>

              <HStack color="gray.600" fontSize="sm">
                <Calendar size={16} />
                <Text>{new Date(report.date).toLocaleDateString()}</Text>
              </HStack>

              <Badge colorScheme={report.status === 'new' ? 'green' : 'gray'}>
                {report.status === 'new' ? 'New' : 'Viewed'}
              </Badge>

              <Text color="gray.600" fontSize="sm">
                Doctor: {report.doctorName}
              </Text>
            </VStack>

            <Button
              leftIcon={<Download size={16} />}
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              Download
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {/* Preview Modal */}
      <PDFPreviewModal isOpen={isOpen} onClose={onClose} report={report} />
    </>
  );
};

const MedicalReportsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Sample data - would come from API in real app
  const reports = [
    {
      id: 1,
      title: 'Annual Health Checkup Report',
      date: '2024-12-20',
      doctorName: 'Dr. Sarah Miller',
      status: 'new',
      fileUrl: '/reports/checkup.pdf',
    },
    {
      id: 2,
      title: 'Blood Test Results',
      date: '2024-12-15',
      doctorName: 'Dr. John Wilson',
      status: 'viewed',
      fileUrl: '/reports/bloodtest.pdf',
    },
    {
      id: 3,
      title: 'X-Ray Report',
      date: '2024-12-10',
      doctorName: 'Dr. Emily Chen',
      status: 'viewed',
      fileUrl: '/reports/xray.pdf',
    },
  ];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <VStack align="stretch" spacing={6}>
      <HStack>
        <InputGroup maxW="400px">
          <InputLeftElement>
            <Search size={18} className="text-gray-400" />
          </InputLeftElement>
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          w="200px"
        >
          <option value="all">All Reports</option>
          <option value="new">New</option>
          <option value="viewed">Viewed</option>
        </Select>
      </HStack>

      {filteredReports.length === 0 ? (
        <Card variant="outline">
          <CardBody>
            <Text color="gray.600" textAlign="center">
              No reports found
            </Text>
          </CardBody>
        </Card>
      ) : (
        filteredReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))
      )}
    </VStack>
  );
};

export default MedicalReportsList;
