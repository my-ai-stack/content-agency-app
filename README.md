# Content Agency App — Self-Service AI Content Generator

> Generate blog posts, social content, and emails instantly.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- API Route calls to Stack 3.0 (your deployed model)

## Workflow
```
User selects content type → Fills brief form → AI generates → Copy/download
```

## Setup
```bash
cd content-agency-app
npm install
npm run dev
```

## API
`POST /api/generate`
```json
{
  "contentType": "blog" | "social" | "email",
  "topic": "string",
  "industry": "string",
  "audience": "string",
  "tone": "string",
  "goal": "string"
}
```

## Content Types
- **Blog** — 800-1200 word post with intro, body, conclusion
- **Social** — 5 LinkedIn/Twitter posts with hooks, body, CTAs
- **Email** — Promotional email with subject, body, CTA

## File Structure
```
app/
├── page.tsx          ← Landing + form
├── api/
│   └── generate/
│       └── route.ts  ← AI generation endpoint
└── layout.tsx
```
