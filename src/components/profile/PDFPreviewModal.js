import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  useToast,
  Badge,
  IconButton,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Share2,
  Printer,
  Calendar,
  User,
  FileText,
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDFPreviewModal = ({ isOpen, onClose, report }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);

  const generatePDF = () => {
    // Initialize PDF document
    const doc = new jsPDF();

    // Add hospital logo/header
    doc.setFontSize(20);
    doc.setTextColor(22, 120, 242); // Blue color for header
    doc.text('StayHealthy Medical Center', 105, 20, { align: 'center' });

    // Add report title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(report?.title || 'Medical Report', 105, 35, { align: 'center' });

    // Add date and doctor info
    doc.setFontSize(12);
    doc.text(
      `Date: ${new Date(report?.date || Date.now()).toLocaleDateString()}`,
      20,
      50
    );
    doc.text(`Doctor: ${report?.doctorName || 'Dr. Smith'}`, 20, 60);
    doc.text(`Department: ${report?.department || 'General Medicine'}`, 20, 70);

    // Add patient information table
    doc.autoTable({
      startY: 80,
      head: [['Patient Information']],
      body: [
        ['Name:', 'John Doe'],
        ['Patient ID:', 'P123456'],
        ['Date of Birth:', '01/15/1985'],
        ['Gender:', 'Male'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [22, 120, 242] },
      styles: { fontSize: 12 },
    });

    // Add medical findings table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Test', 'Result', 'Normal Range', 'Status']],
      body: [
        ['Blood Pressure', '120/80 mmHg', '90-140/60-90', 'Normal'],
        ['Heart Rate', '72 bpm', '60-100', 'Normal'],
        ['Temperature', '98.6°F', '97.8-99.1', 'Normal'],
        ['Respiratory Rate', '16/min', '12-20', 'Normal'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [22, 120, 242] },
      styles: { fontSize: 12 },
    });

    // Add doctor's notes
    doc.setFontSize(14);
    doc.text("Doctor's Notes:", 20, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(12);
    const notes =
      "Patient's vital signs are within normal ranges. Continue with current medication and lifestyle recommendations. Follow-up appointment recommended in 6 months.";
    const splitNotes = doc.splitTextToSize(notes, 170);
    doc.text(splitNotes, 20, doc.lastAutoTable.finalY + 30);

    // Add footer
    doc.setFontSize(10);
    doc.text(
      'This is a computer-generated report and does not require signature.',
      105,
      280,
      { align: 'center' }
    );

    return doc;
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const doc = generatePDF();

      // Save the PDF
      const fileName = `${report?.title || 'medical-report'}_${
        new Date().toISOString().split('T')[0]
      }.pdf`;
      doc.save(fileName);

      toast({
        title: 'Download Complete',
        description: 'Your report has been downloaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Failed to generate PDF. Please try again.',
        status: 'error',
        duration: 3000,
      });
      console.error('PDF generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const doc = generatePDF();
    doc.autoPrint();
    doc.output('dataurlnewwindow');
  };

  // ... rest of the component code (UI, zoom controls, etc.) remains the same

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent h="90vh">
        <ModalHeader>
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <HStack>
                <FileText size={24} />
                <Text>{report?.title}</Text>
              </HStack>
              <Badge colorScheme={report?.status === 'new' ? 'green' : 'gray'}>
                {report?.status === 'new' ? 'New' : 'Viewed'}
              </Badge>
            </HStack>
            <HStack fontSize="sm" color="gray.600" spacing={4}>
              <HStack>
                <Calendar size={14} />
                <Text>
                  {new Date(report?.date || Date.now()).toLocaleDateString()}
                </Text>
              </HStack>
              <HStack>
                <User size={14} />
                <Text>{report?.doctorName}</Text>
              </HStack>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box
            w="full"
            h="full"
            overflow="auto"
            bg="gray.50"
            borderRadius="md"
            p={4}
          >
            <Box
              bg="white"
              mx="auto"
              my={4}
              p={8}
              maxW="850px"
              boxShadow="sm"
              borderRadius="md"
              transform={`scale(${scale})`}
              transformOrigin="top center"
            >
              {/* Preview content */}
              <VStack spacing={6} align="stretch">
                <Heading size="lg" textAlign="center" color="blue.500">
                  StayHealthy Medical Center
                </Heading>
                <Heading size="md" textAlign="center">
                  {report?.title || 'Medical Report'}
                </Heading>
                <Text>
                  Date:{' '}
                  {new Date(report?.date || Date.now()).toLocaleDateString()}
                </Text>
                <Text>Doctor: {report?.doctorName || 'Dr. Smith'}</Text>
                {/* Add more report content here */}
              </VStack>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <Button leftIcon={<Printer />} onClick={handlePrint}>
              Print
            </Button>
            <Button
              leftIcon={<Download />}
              colorScheme="blue"
              onClick={handleDownload}
              isLoading={loading}
            >
              Download PDF
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFPreviewModal;
