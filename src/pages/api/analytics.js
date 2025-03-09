export default function handler(req, res) {
    // This will never actually be called in the challenge
    // because we're not running a real backend
    res.status(200).json({ status: 'ok' });
  }