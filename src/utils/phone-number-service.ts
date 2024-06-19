import auth from '@react-native-firebase/auth';

export const sendVerificationCode = async (phoneNumber: string) => {
  try {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    return confirmation;
  } catch (error) {
    console.error('Phone number verification failed:', error);
    throw error;
  }
};

export const confirmVerificationCode = async (
  verificationId: string,
  code: string,
) => {
  try {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    return credential;
  } catch (error) {
    console.error('Verification code confirmation failed:', error);
    throw error;
  }
};

export const updatePhoneNumber = async (
  phoneNumber: string,
  verificationId: string,
  code: string,
) => {
  try {
    const credential = await confirmVerificationCode(verificationId, code);

    // Update the user's phone number
    const user = auth().currentUser;
    if (user) {
      await user.updatePhoneNumber(credential);
      console.log('Phone number updated successfully!');
    } else {
      throw new Error('Ty again');
    }
  } catch (error) {
    console.error('Failed to update phone number:', error);
    throw error;
  }
};
