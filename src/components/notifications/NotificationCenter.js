// src/components/notifications/NotificationCenter.js
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Portal,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  Bell,
  Calendar,
  Clock,
  MoreVertical,
  Check,
  X,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Notification Item Component
const NotificationItem = ({ notification, onAction, onDismiss }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'appointment':
        return <Calendar size={20} />;
      case 'reminder':
        return <Clock size={20} />;
      case 'alert':
        return <AlertCircle size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const getActionButtons = () => {
    switch (notification.type) {
      case 'appointment':
        return (
          <HStack>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => onAction(notification, 'view')}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAction(notification, 'reschedule')}
            >
              Reschedule
            </Button>
          </HStack>
        );
      case 'reminder':
        return (
          <HStack>
            <IconButton
              size="sm"
              colorScheme="green"
              icon={<Check size={16} />}
              onClick={() => onAction(notification, 'acknowledge')}
            />
            <IconButton
              size="sm"
              colorScheme="red"
              icon={<X size={16} />}
              onClick={() => onDismiss(notification.id)}
            />
          </HStack>
        );
      default:
        return (
          <Button
            size="sm"
            rightIcon={<ChevronRight size={16} />}
            onClick={() => onAction(notification, 'view')}
          >
            Details
          </Button>
        );
    }
  };

  return (
    <Box
      p={4}
      bg={notification.isRead ? 'white' : 'blue.50'}
      borderRadius="md"
      borderWidth="1px"
      borderColor={notification.isRead ? 'gray.200' : 'blue.200'}
    >
      <HStack align="start" spacing={4}>
        <Box color={notification.isRead ? 'gray.500' : 'blue.500'}>
          {getIcon()}
        </Box>
        <VStack align="start" flex={1} spacing={2}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="medium">{notification.title}</Text>
            <Badge
              colorScheme={
                notification.priority === 'high'
                  ? 'red'
                  : notification.priority === 'medium'
                  ? 'yellow'
                  : 'gray'
              }
            >
              {notification.priority}
            </Badge>
          </HStack>
          <Text color="gray.600" fontSize="sm">
            {notification.message}
          </Text>
          <Text color="gray.500" fontSize="xs">
            {new Date(notification.timestamp).toLocaleString()}
          </Text>
          <HStack justify="space-between" w="full">
            {getActionButtons()}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MoreVertical size={16} />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem onClick={() => onDismiss(notification.id)}>
                  Dismiss
                </MenuItem>
                <MenuItem onClick={() => onAction(notification, 'markAsRead')}>
                  Mark as {notification.isRead ? 'unread' : 'read'}
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const NotificationCenter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Sample notifications - in real app would come from context/API
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Appointment with Dr. Sarah Miller tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      isRead: false,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication',
      timestamp: new Date().toISOString(),
      priority: 'medium',
      isRead: true,
    },
    {
      id: 3,
      type: 'alert',
      title: 'New Health Tips',
      message: 'Check out new health tips for maintaining a healthy lifestyle',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      priority: 'low',
      isRead: false,
    },
  ];

  const handleAction = (notification, action) => {
    switch (action) {
      case 'view':
        if (notification.type === 'appointment') {
          navigate('/profile/appointments');
        }
        break;
      case 'reschedule':
        navigate('/profile/appointments', {
          state: { reschedule: notification.id },
        });
        break;
      // Add other action handlers
      default:
        break;
    }
    onClose();
  };

  const handleDismiss = (notificationId) => {
    // Handle notification dismissal
    console.log('Dismiss notification:', notificationId);
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'appointments':
        return notification.type === 'appointment';
      case 'reminders':
        return notification.type === 'reminder';
      default:
        return true;
    }
  });

  // Bell icon with unread count
  const NotificationBell = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
      <Box position="relative">
        <IconButton
          icon={<Bell size={20} />}
          variant="ghost"
          onClick={onOpen}
          aria-label="Notifications"
        />
        {unreadCount > 0 && (
          <Badge
            position="absolute"
            top="-1"
            right="-1"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Box>
    );
  };

  return (
    <>
      <NotificationBell />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text>Notifications</Text>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  // Mark all as read
                }}
              >
                Mark all as read
              </Button>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <HStack>
                <Button
                  size="sm"
                  variant={filter === 'all' ? 'solid' : 'ghost'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'unread' ? 'solid' : 'ghost'}
                  onClick={() => setFilter('unread')}
                >
                  Unread
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'appointments' ? 'solid' : 'ghost'}
                  onClick={() => setFilter('appointments')}
                >
                  Appointments
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'reminders' ? 'solid' : 'ghost'}
                  onClick={() => setFilter('reminders')}
                >
                  Reminders
                </Button>
              </HStack>

              <Divider />

              {filteredNotifications.length === 0 ? (
                <Box textAlign="center" py={8} color="gray.500">
                  No notifications found
                </Box>
              ) : (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onAction={handleAction}
                    onDismiss={handleDismiss}
                  />
                ))
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationCenter;
