import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const token = await authService.register(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { username } = req.body;
    const resetToken = await authService.requestPasswordReset(username);
    res.json({ msg: 'Password reset token generated', resetToken }); // In production, send via email instead
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};