# Calendar Test Project

A Vue.js 3 + TypeScript calendar application.

## Project Setup

```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

---

## Deployment to Netlify

### Option 1: Manual Deployment (Drag & Drop)
1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Go to your [Netlify Team Overview](https://app.netlify.com/teams/).
3. Drag and drop the **`dist`** folder (created after the build) into the deployment area.
4. **Important:** Do NOT upload the entire project folder, only the `dist` content.

### Option 2: Automatic Deployment (GitHub/GitLab)
The project includes a `netlify.toml` file configured for automatic builds.
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

If you are connecting your repository to Netlify, these settings will be picked up automatically.

## Troubleshooting "Site not found"
If you encounter a "Site not found" error on Netlify:
- **Manual Upload:** Ensure you uploaded the contents of the `dist` folder, not the root directory.
- **Git Upload:** Check the "Deploys" tab in Netlify to ensure the build finished successfully. Verify that the `dist` folder is NOT being ignored by Git (check `.gitignore`).
- **Redirects:** The `netlify.toml` includes a redirect rule for SPA support (`/* -> /index.html 200`). This ensures that deep links work correctly.

[![Netlify Status](https://api.netlify.com/api/v1/badges/0f904a1f-e2c2-45c0-b0e1-7baefbeca89d/deploy-status)](https://app.netlify.com/projects/calendar-xarlande/deploys)
