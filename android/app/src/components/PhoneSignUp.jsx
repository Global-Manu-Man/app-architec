import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

const PhoneSignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: response => {
          // reCAPTCHA solved - will proceed with submit function
        },
      },
      auth,
    );
  };

  const handleSendCode = async () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );
      await auth.signInWithCredential(credential);
      alert('Phone number verified!');
    } catch (error) {
      console.error(error);
      alert('Failed to verify phone number');
    }
  };

  return (
    <div>
      <h1>Phone Sign Up</h1>
      <div id="recaptcha-container" />
      <input
        type="tel"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleSendCode}>Send Code</button>
      <input
        type="text"
        value={verificationCode}
        onChange={e => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
      />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </div>
  );
};

export default PhoneSignUp;
