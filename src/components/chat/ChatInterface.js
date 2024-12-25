import React, { useState, useRef, useEffect } from 'react';
import {
  VStack,
  HStack,
  Box,
  Input,
  Button,
  Avatar,
  Text,
  Card,
  CardBody,
  IconButton,
  Badge,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Message = ({ message, isUser }) => (
  <HStack align="start" justify={isUser ? 'flex-end' : 'flex-start'} w="full">
    {!isUser && (
      <Avatar size="sm" name={message.senderName} src={message.senderAvatar} />
    )}
    <Box
      maxW="70%"
      bg={isUser ? 'blue.500' : 'gray.100'}
      color={isUser ? 'white' : 'gray.800'}
      px={4}
      py={2}
      borderRadius="lg"
      borderTopLeftRadius={!isUser ? '0' : 'lg'}
      borderTopRightRadius={isUser ? '0' : 'lg'}
    >
      <Text fontSize="sm">{message.text}</Text>
      <Text
        fontSize="xs"
        color={isUser ? 'whiteAlpha.700' : 'gray.500'}
        textAlign="right"
      >
        {new Date(message.timestamp).toLocaleTimeString()}
      </Text>
    </Box>
    {isUser && (
      <Avatar size="sm" name={message.senderName} src={message.senderAvatar} />
    )}
  </HStack>
);

const ChatInterface = ({ doctor, consultation }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [messages, setMessages] = useState([
    // Initial system message
    {
      id: '1',
      text: `Welcome to your consultation with ${doctor.name}. The doctor will join shortly.`,
      timestamp: new Date().toISOString(),
      senderName: 'System',
      type: 'system',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate doctor joining after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `Hi, I'm ${doctor.name}. I've reviewed your symptoms. How can I help you today?`,
          timestamp: new Date().toISOString(),
          senderName: doctor.name,
          senderAvatar: doctor.image,
          type: 'doctor',
        },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [doctor]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const messageData = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      senderName: user.name,
      senderAvatar: user.profilePicture,
      type: 'user',
      attachments: [...attachments],
    };

    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
    setAttachments([]);

    // Simulate doctor typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate doctor response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'I understand. Let me review that information...',
          timestamp: new Date().toISOString(),
          senderName: doctor.name,
          senderAvatar: doctor.image,
          type: 'doctor',
        },
      ]);
    }, 3000);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 3) {
      toast({
        title: 'Too many files',
        description: 'You can only upload up to 3 files at once',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: 'Files too large',
        description: 'Total file size should be less than 5MB',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setAttachments(files);
  };

  return (
    <VStack h="full" spacing={4}>
      {/* Doctor Info Card */}
      <Card w="full">
        <CardBody>
          <HStack spacing={4}>
            <Avatar size="md" name={doctor.name} src={doctor.image} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{doctor.name}</Text>
              <Text color="gray.600" fontSize="sm">
                {doctor.specialization}
              </Text>
            </VStack>
            <Badge colorScheme="green" ml="auto">
              Online
            </Badge>
          </HStack>
        </CardBody>
      </Card>

      {/* Messages Area */}
      <VStack
        flex={1}
        w="full"
        bg="gray.50"
        borderRadius="md"
        p={4}
        spacing={4}
        overflowY="auto"
        maxH="600px"
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isUser={message.type === 'user'}
          />
        ))}
        {isTyping && (
          <HStack align="start">
            <Avatar size="sm" name={doctor.name} src={doctor.image} />
            <Box
              bg="gray.100"
              px={4}
              py={2}
              borderRadius="lg"
              borderTopLeftRadius={0}
            >
              <Text fontSize="sm" color="gray.600">
                typing...
              </Text>
            </Box>
          </HStack>
        )}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Input Area */}
      <HStack w="full" spacing={2}>
        <IconButton
          icon={<Paperclip />}
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        />
        <IconButton
          icon={<ImageIcon />}
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        />
        <Input
          type="file"
          ref={fileInputRef}
          display="none"
          multiple
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx"
        />
        <Textarea
          placeholder="Type your message..."
          resize="none"
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          colorScheme="blue"
          onClick={handleSendMessage}
          isDisabled={!newMessage.trim() && attachments.length === 0}
        >
          <Send size={20} />
        </Button>
      </HStack>

      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <HStack w="full" spacing={2}>
          {attachments.map((file, index) => (
            <Badge key={index} colorScheme="blue">
              {file.name}
            </Badge>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default ChatInterface;
