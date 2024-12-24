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
  Spinner,
  Center,
} from '@chakra-ui/react';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const PDFPreviewModal = ({ isOpen, onClose, report }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const handleDownload = async () => {
    try {
      // In real app, this would trigger actual download
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

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent h="90vh">
        <ModalHeader>
          <Text noOfLines={1}>{report?.title}</Text>
          <Text fontSize="sm" color="gray.600" mt={1}>
            {new Date(report?.date).toLocaleDateString()} • {report?.doctorName}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack h="full" spacing={4}>
            {/* Controls */}
            <HStack w="full" justify="center" spacing={4}>
              <IconButton
                icon={<ZoomOut size={18} />}
                onClick={handleZoomOut}
                aria-label="Zoom out"
                isDisabled={scale <= 0.5}
              />
              <IconButton
                icon={<ZoomIn size={18} />}
                onClick={handleZoomIn}
                aria-label="Zoom in"
                isDisabled={scale >= 2}
              />
              <IconButton
                icon={<RotateCcw size={18} />}
                onClick={handleReset}
                aria-label="Reset zoom"
                isDisabled={scale === 1}
              />
              <Text fontSize="sm" color="gray.600">
                {Math.round(scale * 100)}%
              </Text>
            </HStack>

            {/* PDF Preview */}
            <Box
              w="full"
              h="full"
              borderWidth={1}
              borderRadius="md"
              overflow="auto"
              position="relative"
            >
              {loading && (
                <Center position="absolute" inset={0}>
                  <Spinner size="xl" color="blue.500" />
                </Center>
              )}

              {/* In a real app, this would be the actual PDF viewer */}
              {/* For demo, using placeholder iframe */}
              <Box
                as="iframe"
                src="/api/placeholder/800/1000"
                w="full"
                h="full"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
                onLoad={() => setLoading(false)}
              />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            leftIcon={<Download size={16} />}
            onClick={handleDownload}
            bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
            color="white"
            _hover={{ opacity: 0.9 }}
          >
            Download Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFPreviewModal;
