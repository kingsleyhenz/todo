import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.js';

export const register = async ({ email, username, password }) => {
  let user = await User.findOne({ email });
  if (user) throw new Error('User already exists');

  user = new User({ email, username, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const requestPasswordReset = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  // In production, send email with resetToken (not hashed)
  // e.g., using Nodemailer: sendEmail(user.email, resetToken);
  console.log(`Reset token (send this via email): ${resetToken}`);
  return resetToken;
};

export const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error('Invalid or expired reset token');

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return true;
};