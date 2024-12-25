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
  Button,
  Badge,
  Select,
  useToast,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react';
import {
  Search,
  FileText,
  Download,
  Calendar,
  MoreVertical,
  Eye,
  Trash,
  Share2,
} from 'lucide-react';
import PDFPreviewModal from './PDFPreviewModal';

// Sample data - In production, this would come from an API
const sampleReports = [
  {
    id: 1,
    title: 'Annual Health Checkup Report',
    date: '2024-12-20',
    doctorName: 'Dr. Sarah Miller',
    department: 'General Medicine',
    type: 'Checkup',
    status: 'new',
  },
  {
    id: 2,
    title: 'Blood Test Results',
    date: '2024-12-15',
    doctorName: 'Dr. John Wilson',
    department: 'Pathology',
    type: 'Laboratory',
    status: 'viewed',
  },
  {
    id: 3,
    title: 'X-Ray Report - Chest',
    date: '2024-12-10',
    doctorName: 'Dr. Emily Chen',
    department: 'Radiology',
    type: 'Radiology',
    status: 'viewed',
  },
  {
    id: 4,
    title: 'Cardiology Consultation Report',
    date: '2024-12-05',
    doctorName: 'Dr. Michael Brown',
    department: 'Cardiology',
    type: 'Consultation',
    status: 'new',
  },
];

const ReportCard = ({ report, onView, onDownload, onDelete, onShare }) => {
  return (
    <Card variant="outline" mb={4}>
      <CardBody>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <HStack>
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

            <HStack fontSize="sm" color="gray.600" spacing={4}>
              <Text>Doctor: {report.doctorName}</Text>
              <Text>Department: {report.department}</Text>
              <Text>Type: {report.type}</Text>
            </HStack>
          </VStack>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MoreVertical size={16} />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem icon={<Eye size={16} />} onClick={() => onView(report)}>
                View Report
              </MenuItem>
              <MenuItem
                icon={<Download size={16} />}
                onClick={() => onDownload(report)}
              >
                Download
              </MenuItem>
              <MenuItem
                icon={<Share2 size={16} />}
                onClick={() => onShare(report)}
              >
                Share
              </MenuItem>
              <MenuItem
                icon={<Trash size={16} />}
                onClick={() => onDelete(report)}
                color="red.500"
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </CardBody>
    </Card>
  );
};

const MedicalReportsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const toast = useToast();

  // Filter reports based on search term and filter type
  const filteredReports = sampleReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      report.status === filter ||
      report.type.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleView = (report) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  const handleDownload = (report) => {
    // In production, this would trigger actual download
    toast({
      title: 'Download started',
      description: 'Your report is being downloaded...',
      status: 'success',
      duration: 3000,
    });
  };

  const handleDelete = (report) => {
    // In production, this would make an API call
    toast({
      title: 'Report deleted',
      description: 'The report has been deleted successfully.',
      status: 'success',
      duration: 3000,
    });
  };

  const handleShare = (report) => {
    // In production, this would open sharing options
    toast({
      title: 'Share feature',
      description: 'Sharing options will be available soon.',
      status: 'info',
      duration: 3000,
    });
  };

  return (
    <VStack align="stretch" spacing={6}>
      <HStack spacing={4}>
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
          <option value="new">New Reports</option>
          <option value="viewed">Viewed Reports</option>
          <option value="Laboratory">Laboratory</option>
          <option value="Radiology">Radiology</option>
          <option value="Consultation">Consultation</option>
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
          <ReportCard
            key={report.id}
            report={report}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))
      )}

      <PDFPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        report={selectedReport}
      />
    </VStack>
  );
};

export default MedicalReportsList;
