# Recipe Collection

A simple, clean recipe website with UK measurements. Built with vanilla HTML, CSS, and JavaScript for easy deployment to GitHub Pages.

## Features

- Clean, responsive design
- Recipe landing page with grid layout
- Individual recipe detail pages
- JSON-based recipe storage for easy updates
- Dietary information tags
- Mobile-friendly interface

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Initialize git in this directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```
4. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Adding New Recipes

To add new recipes, edit the `recipes.json` file. Each recipe should follow this structure:

```json
{
  "id": 9,
  "name": "Recipe Name",
  "source": "Recipe Source",
  "prep_time": "X minutes",
  "cook_time": "X minutes",
  "servings": X,
  "dietary_info": ["vegetarian", "gluten-free"],
  "ingredients": [
    {
      "item": "ingredient name",
      "amount": "quantity",
      "notes": "optional notes"
    }
  ],
  "method": [
    "Step 1",
    "Step 2"
  ]
}
```

The website will automatically display new recipes once the JSON file is updated.

## Local Development

To view the site locally, you can use any local web server. For example:

Using Python 3:
```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Technology Stack

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- JSON for data storage
