import * as yup from 'yup';

const phoneNumberRegex = /^(\+?234|0)?[789]\d{9}$/; //^(\+?234|0)?[789]\d{9}$
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValidityInfo =
  'Password should be a minimum of 8 characters, contains at least on capital letter, one small letter, one number, and one special character.';

export const logInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .test(
      'email',
      'Please enter your email address in this format: yourname@domain.com.',
      value => {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    ),

  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should contain a minimum of 8 characters.')
    .test('password', passwordValidityInfo, value => {
      return passwordRegex.test(value);
    }),
});

export const signUpSchema = yup.object().shape({
  fullName: yup.string().trim().required('First name is required'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Phone number is required')
    .test('password', 'Invalid phone number format', value => {
      return phoneNumberRegex.test(value);
    }),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .test(
      'email',
      'Please enter your email address in this format: yourname@domain.com.',
      value => {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    ),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should contain a minimum of 8 characters.')
    .test('password', passwordValidityInfo, value => {
      return passwordRegex.test(value);
    }),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});
