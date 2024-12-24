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
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Center,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const EditProfileModal = ({ isOpen, onClose, currentUser }) => {
  const { updateProfile } = useAuth();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    profilePicture: currentUser?.profilePicture || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        error('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      success('Profile updated successfully');
      onClose();
    } catch (err) {
      error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6}>
            {/* Profile Picture */}
            <Center position="relative">
              <Avatar
                size="2xl"
                name={formData.name}
                src={formData.profilePicture}
              />
              <IconButton
                icon={<Camera size={16} />}
                size="sm"
                colorScheme="blue"
                rounded="full"
                position="absolute"
                bottom="0"
                right="0"
                onClick={() =>
                  document.getElementById('profile-pic-input').click()
                }
              />
              <Input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
              />
            </Center>

            {/* Name */}
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </FormControl>

            {/* Phone */}
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                type="tel"
              />
            </FormControl>

            {/* Email - Read Only */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={currentUser?.email} isReadOnly bg="gray.50" />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap="3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
            color="white"
            _hover={{ opacity: 0.9 }}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
