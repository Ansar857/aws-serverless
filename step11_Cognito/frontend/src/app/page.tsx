// pages/index.tsx
"use client"
import { useState } from 'react';
import {Amplify , Auth } from 'aws-amplify';
import 'tailwindcss/tailwind.css';
import awsExports from '../aws-export';


Amplify.configure(awsExports);

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error);
    }};

  const handleSignUp = async () => {
    try {
      await Auth.signUp({username,password,attributes: {email,phone_number: phoneNumber}});
      setIsSignUp(false);
      console.log('User signed up successfully. Please check your email for the verification code.');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('User confirmed sign-up');
    } catch (error) {
      console.error('Error confirming sign-up:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await Auth.forgotPassword(username);
      console.log('Password reset code sent successfully');
    } catch (error) {
      console.error('Error sending password reset code:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, password);
      console.log('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        {isSignUp ? 
        (
          <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-2 rounded"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 rounded"/>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 p-2 rounded"/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 rounded"/>
            <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-4 p-2 rounded"/>
            <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
            <p onClick={() => setIsSignUp(false)} className="text-blue-500 cursor-pointer mt-4">Already have an account? Sign In</p>
          </div>
        ) : (
          <div>
            <input type="text"  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-4 p-2 rounded"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 rounded" />
            <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">Sign In</button>
            <p onClick={() => handleForgotPassword()} className="text-blue-500 cursor-pointer mt-4">Forgot Password?</p>
            <p onClick={() => setIsSignUp(true)} className="text-blue-500 cursor-pointer mt-4">Don't have an account? Sign Up</p>
          </div>
        )}
        {isSignUp === false && (
          <div className='mt-8 space-x-10'>
            <input type="text" placeholder="Confirmation Code"
            value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} className="w-full mb-4 p-2 rounded" />
            <button onClick={handleConfirmSignUp} className="bg-blue-500 text-white p-2 rounded">Confirm Sign Up</button>
            <button onClick={handleResetPassword} className="bg-blue-500 text-white p-2 rounded mt-2">Reset Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
