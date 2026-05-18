# FoodTech Ship-to-Plan System

A simple monthly planning and tracking application for FoodTech's B2B packaging business.

## Features

- **User Authentication**: 6 users with password protection
- **Create Monthly Plans**: Select client, SKU, quantity, and month
- **Input Actual Sales**: Record actual deliveries against plans
- **Dashboard**: View fill rates and performance metrics

## User Credentials

All users have the default password: `pass123`

Users:
- Kamoliddin Rustamov
- Rustam
- Bobur
- Asadbek
- Samandar
- Bohodir

## Data Storage

- All data is stored in browser localStorage
- Supplier and SKU data is embedded in the app
- Plans and actuals are shared across all users on the same browser

## Deployment to Vercel

### Option 1: Deploy via GitHub

1. **Create a new GitHub repository**
   - Go to https://github.com/kamolmin
   - Click "New repository"
   - Name it `foodtech-ship-to-plan`
   - Make it public or private
   - Do NOT initialize with README

2. **Push this code to GitHub**
   ```bash
   cd foodtech-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/kamolmin/foodtech-ship-to-plan.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import `foodtech-ship-to-plan` repository
   - Framework Preset: Next.js
   - Click "Deploy"

### Option 2: Deploy directly from Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Connect your GitHub account
5. Select this repository
6. Click "Deploy"

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
foodtech-app/
├── app/
│   ├── layout.js          # Root layout
│   └── page.js            # Main application (all 3 screens)
├── public/
│   └── data/
│       └── data.json      # Suppliers and SKUs data
├── package.json
├── next.config.js
└── README.md
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Inline CSS (no external dependencies)
- **Storage**: Browser localStorage
- **Deployment**: Vercel

## Notes

- Password security: Passwords are hardcoded in client-side code for simplicity
- Data persistence: Data only persists in the browser's localStorage
- Shared data: All users on the same browser see the same data
- No backend: This is a fully client-side application
