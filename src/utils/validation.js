// src/utils/validation.js
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\d{10}$/;
const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;

export const validateField = (fieldName, value, options = {}) => {
  const errors = [];

  switch (fieldName) {
    case 'email':
      if (!value) {
        errors.push('Email is required');
      } else if (!EMAIL_REGEX.test(value)) {
        errors.push('Please enter a valid email address');
      }
      break;

    case 'password':
      if (!value) {
        errors.push('Password is required');
      } else {
        if (value.length < 8) {
          errors.push('Password must be at least 8 characters');
        }
        if (!/[A-Z]/.test(value)) {
          errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(value)) {
          errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(value)) {
          errors.push('Password must contain at least one number');
        }
      }
      break;

    case 'name':
      if (!value) {
        errors.push('Name is required');
      } else if (!NAME_REGEX.test(value)) {
        errors.push(
          'Please enter a valid name (2-50 characters, letters only)'
        );
      }
      break;

    case 'phone':
      if (!value) {
        errors.push('Phone number is required');
      } else if (!PHONE_REGEX.test(value)) {
        errors.push('Please enter a valid 10-digit phone number');
      }
      break;

    case 'date':
      if (!value) {
        errors.push('Date is required');
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          errors.push('Please select a future date');
        }

        if (options.maxDate) {
          const maxDate = new Date(options.maxDate);
          if (selectedDate > maxDate) {
            errors.push(
              `Date cannot be later than ${maxDate.toLocaleDateString()}`
            );
          }
        }
      }
      break;

    case 'timeSlot':
      if (!value) {
        errors.push('Time slot is required');
      }
      break;

    case 'rating':
      if (!value || value < 1 || value > 5) {
        errors.push('Please select a rating between 1 and 5');
      }
      break;

    case 'review':
      if (!value) {
        errors.push('Review comment is required');
      } else if (value.length < 10) {
        errors.push('Review must be at least 10 characters long');
      } else if (value.length > 500) {
        errors.push('Review cannot exceed 500 characters');
      }
      break;

    default:
      if (options.required && !value) {
        errors.push(`${fieldName} is required`);
      }
  }

  return errors;
};

export const validateForm = (formData, schema) => {
  const errors = {};
  let isValid = true;

  Object.entries(schema).forEach(([fieldName, validationOptions]) => {
    const fieldErrors = validateField(
      fieldName,
      formData[fieldName],
      validationOptions
    );
    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Example usage:
export const loginFormSchema = {
  email: { required: true },
  password: { required: true },
};

export const registrationFormSchema = {
  name: { required: true },
  email: { required: true },
  phone: { required: true },
  password: { required: true },
};

export const appointmentFormSchema = {
  date: {
    required: true,
    maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  },
  timeSlot: { required: true },
  phone: { required: true },
};

export const reviewFormSchema = {
  rating: { required: true },
  review: { required: true },
};

// Common error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Unable to connect to server. Please check your internet connection.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  UNAUTHORIZED: 'Please log in to continue.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  BOOKING_CONFLICT:
    'This time slot is no longer available. Please choose another time.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'This email is already registered.',
  WEAK_PASSWORD:
    'Password is too weak. Please follow the password requirements.',
};

// Error handler for common API errors
export const handleApiError = (error) => {
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  switch (error.response.status) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.SESSION_EXPIRED;
    case 409:
      return ERROR_MESSAGES.BOOKING_CONFLICT;
    case 422:
      return error.response.data?.message || ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.SERVER_ERROR;
  }
};
