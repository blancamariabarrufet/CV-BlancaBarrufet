# Blanca M Barrufet Garbayo - Portfolio & Interactive CV

A modern, professional portfolio website featuring an AI chatbot and interactive CV. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🤖 AI Chatbot Widget
- Interactive chatbot front and center on the landing page
- Quick action buttons for common queries
- Real-time conversation about experience, skills, and background
- Ready for backend integration

### 📄 Interactive CV
- Expandable experience timeline
- Skill filtering and highlighting
- Click any skill to highlight relevant experience
- Responsive design for all devices
- Print-friendly styling
- Download PDF functionality

### 🎨 Professional Design
- Clean typography and spacing
- Subtle animations with smooth transitions
- Responsive layout (mobile + desktop)
- Sticky header navigation
- Professional color scheme

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Chat API endpoint (ready for backend integration)
│   ├── cv/page.tsx           # Dedicated CV page
│   ├── page.tsx              # Home page with chatbot
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ChatWidget.tsx        # Chatbot UI component
│   ├── InteractiveCv.tsx     # Interactive CV with filtering
│   ├── ContactForm.tsx       # Contact form with EmailJS
│   ├── CvActionButtons.tsx   # CV action buttons
│   ├── Header.tsx            # Site header
│   └── Footer.tsx            # Site footer
├── data/
│   └── cv.json              # CV content (edit this to update your CV)
├── public/
│   └── cv.pdf               # Downloadable CV PDF
└── files/                   # Original assets (not tracked)
```

## Updating Your CV

All CV content is driven by `data/cv.json`. To update your CV:

1. Edit `data/cv.json` with your information
2. The website will automatically render your updated content
3. No need to modify component files

### CV JSON Structure

```json
{
  "profile": { "name", "headline", "location", "email", "links" },
  "summary": ["bullet points"],
  "skills": { "languages", "frameworks", "tools", "methods" },
  "experience": [{ "company", "title", "start", "end", "bullets", "tags" }],
  "education": [{ "school", "program", "start", "end", "description" }],
  "certifications": [{ "name", "issuer", "tags" }],
  "languages": [{ "language", "proficiency" }],
  "awards": [{ "name", "description" }],
  "extracurricular": [{ "name", "organization", "description" }]
}
```

## Connecting the Chatbot Backend

The chatbot frontend is ready for integration. To connect your backend:

1. Set the backend URL in your environment:
   ```bash
   # .env.local
   CHAT_BACKEND_URL=https://your-backend-url.com
   ```

2. Update `app/api/chat/route.ts`:
   - Uncomment the backend forwarding code
   - Remove the mock response logic
   - Adjust the request/response format to match your backend

### Expected Backend API Contract

**Request:**
```json
{
  "message": "user message",
  "conversationId": "unique-session-id"
}
```

**Response:**
```json
{
  "reply": "assistant response",
  "conversationId": "unique-session-id"
}
```

## Setting Up the Contact Form

The contact form uses EmailJS to send messages directly to your email without a backend server.

### EmailJS Setup

The contact form sends **two emails** when a user submits:
1. **Team notification** - Email to you with the user's message
2. **Client auto-reply** - Confirmation email to the user

1. **Create an EmailJS Account**: Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)

2. **Create Two Templates**:
   - **Team Template** (for you to receive messages):
     - Template ID: `your_team_template_id`
     - To Email: `your@email.com`
     - Template content should include: `{{name}}`, `{{email}}`, `{{message}}`

   - **Client Template** (auto-reply to users):
     - Template ID: `your_client_template_id`
     - To Email: `{{email}}` (sends to the form submitter)
     - Template content: Thank you message

3. **Get Your Credentials**:
   - Service ID (e.g., `service_xxxxxxx`)
   - Public Key (e.g., `xxxxxxxxxxxxx`)

4. **Configure Environment Variables**:
   ```bash
   # .env.local
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT_ID=your_client_template_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM_ID=your_team_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. **Template Variables**: Both templates should use these form field names:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - Message content

**Important**: Never commit `.env.local` to git. It's already in `.gitignore` to protect your keys.

## Features Detail

### Skill Filtering
- Click any skill chip to filter relevant experience
- Highlighted experiences show which use the selected skill
- Reset filters button to clear selection

### Experience Timeline
- Click any experience card to expand/collapse details
- Shows bullets, tags, and full description when expanded
- Visual indicators for filtered/highlighted items

### Contact Form
- Professional contact form with EmailJS integration
- Real-time validation and status messages
- Loading states and error handling
- Direct email fallback option
- Spam protection through EmailJS

### Download CV
- **Download PDF**: Click button on CV page to download PDF
- Print-friendly styling with optimized layout

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Email Service**: EmailJS
- **Animations**: CSS transitions & keyframes
- **Fonts**: Inter (Google Fonts)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

### Adding New Sections

1. Add data to `data/cv.json`
2. Update `components/InteractiveCv.tsx` to render the new section
3. Follow existing patterns for consistent styling

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the static site:
```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Typography
Change the font in `app/layout.tsx` (currently using Inter).

### Content
All content lives in `data/cv.json` - no code changes needed.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2025 Blanca M Barrufet Garbayo. All rights reserved.

## Contact

For questions or collaboration opportunities:
- Email: blancamariabarrufet@gmail.com
- Website: [Live Site URL]

---

Built with ❤️ using Next.js and Tailwind CSS
