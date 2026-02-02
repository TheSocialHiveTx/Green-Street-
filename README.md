# Green Street Builders - Static Website

This is the static HTML website for Green Street Builders. It is designed to be lightweight, fast, and easy to host on platforms like GitHub Pages.

## Hosting on GitHub Pages

1. **Push to GitHub**: Push this repository to a new GitHub repository.
2. **Enable Pages**: 
   - Go to **Settings** > **Pages** in your GitHub repository.
   - Under **Build and deployment**, set the source to **Deploy from a branch**.
   - Select the `main` branch and the `/ (root)` folder.
   - Click **Save**.
3. **Enjoy**: Your site will be live at `https://<your-username>.github.io/<repo-name>/` in a few minutes.

## Local Development

Since this is a simple static site, you can view it by simply opening `index.html` in any web browser. 

Alternatively, you can use a simple dev server:
```bash
npx serve .
```

## Technologies Used
- HTML5 / CSS3
- Tailwind CSS (via CDN)
- Lucide Icons (via CDN)
- Google Fonts
