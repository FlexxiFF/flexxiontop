
# Lumina Holographic Links

A hyper-modern, holographic social link aggregator with an integrated AI bio generator and admin management system.

## 🚀 Deployment Instructions

### 1. Upload to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize your local folder as a git repo:
   ```bash
   git init
   git add .
   git commit -m "initial system core"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

### 2. Deploy to Netlify
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect the `netlify.toml` settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
5. **CRITICAL STEP**: Go to **Site Settings** > **Environment variables**.
6. Add a new variable:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `[Your Google Gemini API Key]`
7. Trigger a new deploy.

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Holographic Shaders
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Bundler**: Vite

## 🔐 Admin Access
By default, access the admin panel by clicking the hidden `[REQUEST_ADMIN_UPLINK]` link in the footer.
- **Username**: `admin`
- **Password**: `admin`
(Note: This is a demo implementation using local storage for persistence.)
