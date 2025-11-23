# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static recipe website using vanilla HTML, CSS, and JavaScript, designed for GitHub Pages deployment. All recipes use UK measurements (grams, millilitres, Celsius).

## Architecture

### Data Structure
- **recipes.json**: Single source of truth for all recipe data
- Recipes are stored in a nested JSON structure under `recipe_collection.recipes[]`
- Each recipe has a unique `id` field used for navigation
- Recipe schema supports both simple arrays and nested objects for ingredients/method sections (e.g., separate sections for dough, filling, frosting)

### Page Structure
- **index.html**: Landing page that displays all recipes in a grid
- **recipe.html**: Template page for individual recipe details (populated via URL parameter `?id=X`)
- **app.js**: Fetches recipes and renders the grid on the landing page
- **recipe.js**: Fetches a single recipe by ID and renders detailed view
- **styles.css**: All styling with CSS custom properties for theming

### Navigation Flow
1. Landing page loads all recipes from JSON
2. Each recipe card links to `recipe.html?id={recipe.id}`
3. Recipe detail page reads the `id` parameter and fetches matching recipe
4. Back button returns to landing page

## Adding New Recipes

### Manual Addition
Edit `recipes.json` and add a new recipe object to the `recipes` array. Ensure:
- Unique `id` (increment from highest existing ID)
- Required fields: `id`, `name`
- Common optional fields: `source`, `prep_time`, `cook_time`, `ingredients`, `method`, `dietary_info`

### From Claude Agent Export
The JSON structure is designed to accept exports from other Claude agents. When importing:
1. Ensure the recipe has a unique `id`
2. Verify field names match existing schema
3. Nested structures (ingredients/method objects) are automatically handled by the rendering code

## Recipe Schema Flexibility

The code handles multiple recipe formats:
- **Simple ingredients**: Array of `{item, amount, notes?}`
- **Grouped ingredients**: Object with keys like `dough`, `filling`, `frosting`, each containing an array
- **Simple method**: Array of strings (steps)
- **Grouped method**: Object with keys like `prepare_dough`, `assembly`, `bake`, each containing an array of steps
- **Storage**: Can be a string or object with keys like `room_temp`, `refrigerator`, `freezer`, `reheat`

## Local Development

Test locally using a web server (required for fetch API to work):
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

## GitHub Pages Deployment

This is a static site with no build process:
1. Push to GitHub repository
2. Enable GitHub Pages in repo settings (source: main branch)
3. Site deploys automatically at `https://USERNAME.github.io/REPO-NAME/`

No build step, bundler, or package manager required.

## CSS Architecture

Uses CSS custom properties (`:root` variables) for theming:
- `--primary-color`: Main brand color (green)
- `--secondary-color`: Accent color (lighter green)
- `--text-color`, `--background`, `--card-background`, `--border-color`: UI colors
- `--shadow`, `--shadow-hover`: Elevation effects

Responsive breakpoint at 768px for mobile layout.

## Key Files

- `recipes.json` - All recipe data
- `index.html` + `app.js` - Landing page
- `recipe.html` + `recipe.js` - Recipe detail page
- `styles.css` - All styles
- `README.md` - User-facing documentation
