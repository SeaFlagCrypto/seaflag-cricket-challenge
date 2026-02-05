# 🏏 Seaflag Cricket Challenge

A simple cricket tapping game built for FarCast Mini App.

## Features
- 3 overs (18 balls) per match
- 5 wickets limit
- Tap to hit mechanics
- Score sharing to FarCast
- High scores tracking

## Deployment

### Deploy to Vercel

1. Push this repo to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Deploy with default settings

### Manual Deploy

```bash
npm install -g vercel
vercel
```

## FarCast Integration

The game includes Frame meta tags for FarCast embedding:

- Frame button: "🏏 Play Cricket" → opens the game
- Frame button: "📊 High Scores" → shows scores page
- OG image: Generated via `/api/og` endpoint

## Share on FarCast

Cast this to share:

```
🏏 Seaflag Cricket Challenge

3 overs, 5 wickets - Tap to hit!

Can you beat my score?

👇 Play now!
https://seaflag-cricket-challenge.vercel.app
```

## Files

```
├── index.html       # Main game with FarCast Frame tags
├── scores.html      # High scores page
├── style.css        # Game styles
├── game.js          # Game logic
├── manifest.json    # Mini App manifest
├── vercel.json      # Vercel routing config
└── api/
    └── og.js        # OG image generator
```

## Technologies

- Vanilla HTML/CSS/JavaScript
- FarCast Frames protocol
- Vercel (hosting + serverless functions)

---

Built with ❤️ for the FarCast community!
