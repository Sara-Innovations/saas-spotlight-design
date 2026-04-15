---
description: Deploy React application to production
---

# Deploy React App to Production

This workflow guides you through deploying the React application to production.

## Prerequisites

- Ensure all code changes are committed to git
- Verify the application builds successfully locally
- Check that all API endpoints are configured correctly

## Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Verify build output**
   - Check that `dist/` folder is created
   - Verify all assets are present
   - Check for any build errors

3. **Test production build locally**
   ```bash
   npm run preview
   ```
   // turbo
   Visit http://localhost:4173 and verify everything works

4. **Deploy to hosting platform**
   - For Netlify: Drag `dist/` folder to Netlify dashboard
   - For Vercel: Use `vercel --prod`
   - For custom server: Upload `dist/` contents to web server

5. **Verify deployment**
   - Visit the production URL
   - Check all pages load correctly
   - Verify API connections work
   - Test cart and wishlist functionality

6. **Post-deployment checks**
   - Check browser console for errors
   - Verify all images load
   - Test responsive design
   - Confirm navigation works

## Rollback

If issues are found:
1. Identify the last working version
2. Revert to that commit
3. Rebuild and redeploy
4. Notify team of the issue
