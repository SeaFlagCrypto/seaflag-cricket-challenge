export default function handler(req, res) {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a2e"/>
      <rect width="10" height="100%" fill="#4ecca3"/>
      <text x="50" y="100" fill="white" font-size="60" font-weight="bold" font-family="sans-serif">
        🏏 Seaflag Cricket Challenge
      </text>
      <text x="50" y="170" fill="#888" font-size="30" font-family="sans-serif">
        3 Overs • 5 Wickets • Tap to Hit!
      </text>
      <text x="50" y="350" fill="#e94560" font-size="60" font-weight="bold" font-family="sans-serif">
        🏆 Challenge Your Friends!
      </text>
      <text x="50" y="420" fill="#4ecca3" font-size="40" font-family="sans-serif">
        Play Now →
      </text>
      <text x="50" y="580" fill="#666" font-size="24" font-family="sans-serif">
        seaflag-cricket-challenge.vercel.app
      </text>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'max-age=3600');
  res.send(svg);
}
