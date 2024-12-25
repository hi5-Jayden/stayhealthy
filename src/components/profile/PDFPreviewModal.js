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
  IconButton,
  useToast,
  Badge,
  Divider,
  Tooltip,
  Center,
  Spinner,
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

const PDFPreviewModal = ({ isOpen, onClose, report }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [showToolbar, setShowToolbar] = useState(true);

  // Mock content for demonstration
  const mockContent = `
    <div style="padding: 20px; font-family: Arial;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1678F2; margin-bottom: 10px;">${
          report?.title || 'Medical Report'
        }</h1>
        <p style="color: #4A5568;">StayHealthy Medical Center</p>
        <p style="color: #4A5568;">${new Date().toLocaleDateString()}</p>
      </div>

      <div style="margin: 20px 0; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #2D3748; margin-bottom: 15px;">Patient Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; color: #4A5568;">Name:</td>
            <td style="padding: 8px;">John Doe</td>
            <td style="padding: 8px; color: #4A5568;">Date of Birth:</td>
            <td style="padding: 8px;">01/15/1985</td>
          </tr>
          <tr>
            <td style="padding: 8px; color: #4A5568;">Patient ID:</td>
            <td style="padding: 8px;">P123456</td>
            <td style="padding: 8px; color: #4A5568;">Gender:</td>
            <td style="padding: 8px;">Male</td>
          </tr>
        </table>
      </div>

      <div style="margin: 20px 0; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #2D3748; margin-bottom: 15px;">Medical Findings</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #F7FAFC;">
              <th style="padding: 12px; border: 1px solid #E2E8F0;">Test</th>
              <th style="padding: 12px; border: 1px solid #E2E8F0;">Result</th>
              <th style="padding: 12px; border: 1px solid #E2E8F0;">Normal Range</th>
              <th style="padding: 12px; border: 1px solid #E2E8F0;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">Blood Pressure</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">120/80 mmHg</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">90-140/60-90</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0; color: green;">Normal</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">Heart Rate</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">72 bpm</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">60-100</td>
              <td style="padding: 12px; border: 1px solid #E2E8F0; color: green;">Normal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin: 20px 0; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #2D3748; margin-bottom: 15px;">Doctor's Notes</h2>
        <p style="color: #4A5568; line-height: 1.6;">
          Patient's vital signs are within normal ranges. Continue with current medication and lifestyle recommendations.
          Follow-up appointment recommended in 6 months.
        </p>
      </div>

      <div style="margin-top: 40px; text-align: right;">
        <p style="color: #4A5568;">Prepared by: ${
          report?.doctorName || 'Dr. Smith'
        }</p>
        <p style="color: #4A5568;">Date: ${new Date(
          report?.date || Date.now()
        ).toLocaleDateString()}</p>
      </div>
    </div>
  `;

  const handleDownload = () => {
    setLoading(true);
    try {
      // Create blob from mock content
      const blob = new Blob([mockContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report?.title || 'medical-report'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Download Complete',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    toast({
      title: 'Share Feature',
      description: 'Sharing functionality will be available soon.',
      status: 'info',
      duration: 3000,
    });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

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

        {/* Toolbar */}
        <Box px={6} py={2} borderY="1px" borderColor="gray.200">
          <HStack spacing={4} justify="space-between">
            <HStack>
              <Tooltip label="Zoom out">
                <IconButton
                  icon={<ZoomOut size={18} />}
                  onClick={handleZoomOut}
                  isDisabled={scale <= 0.5}
                  size="sm"
                />
              </Tooltip>
              <Text fontSize="sm" minW="60px" textAlign="center">
                {Math.round(scale * 100)}%
              </Text>
              <Tooltip label="Zoom in">
                <IconButton
                  icon={<ZoomIn size={18} />}
                  onClick={handleZoomIn}
                  isDisabled={scale >= 2}
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Reset zoom">
                <IconButton
                  icon={<RotateCw size={18} />}
                  onClick={handleResetZoom}
                  isDisabled={scale === 1}
                  size="sm"
                />
              </Tooltip>
            </HStack>

            <HStack>
              <Tooltip label="Share">
                <IconButton
                  icon={<Share2 size={18} />}
                  onClick={handleShare}
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Print">
                <IconButton
                  icon={<Printer size={18} />}
                  onClick={handlePrint}
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Download">
                <IconButton
                  icon={<Download size={18} />}
                  onClick={handleDownload}
                  size="sm"
                  isLoading={loading}
                />
              </Tooltip>
            </HStack>
          </HStack>
        </Box>

        {/* Document Viewer */}
        <ModalBody>
          <Box
            w="full"
            h="full"
            overflow="auto"
            bg="gray.50"
            borderRadius="md"
            position="relative"
          >
            {loading && (
              <Center position="absolute" inset={0} bg="whiteAlpha.800">
                <Spinner size="xl" color="blue.500" />
              </Center>
            )}
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
              dangerouslySetInnerHTML={{ __html: mockContent }}
              onLoad={() => setLoading(false)}
            />
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px" borderColor="gray.200">
          <Button
            colorScheme="blue"
            onClick={handleDownload}
            isLoading={loading}
          >
            Download Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFPreviewModal;
