import * as yup from 'yup';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const passwordValidityInfo =
  'Password should be a minimum of 8 characters, contains at least on capital letter, one small letter, one number, and one special character.';

export const logInEmailSchema = yup.object().shape({
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
