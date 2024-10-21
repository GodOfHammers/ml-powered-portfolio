import { setCookie } from 'nookies';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { theme } = req.body;
    setCookie({ res }, 'theme', theme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    res.status(200).json({ message: 'Theme set successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}