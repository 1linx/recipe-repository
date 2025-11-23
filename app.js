// Load and display recipes on the landing page
async function loadRecipes() {
    try {
        const response = await fetch('recipes.json');
        const data = await response.json();
        const recipes = data.recipe_collection.recipes;

        const recipeGrid = document.getElementById('recipe-grid');
        recipeGrid.innerHTML = '';

        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            recipeGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
        document.getElementById('recipe-grid').innerHTML =
            '<p>Error loading recipes. Please try again later.</p>';
    }
}

function createRecipeCard(recipe) {
    const card = document.createElement('a');
    card.href = `recipe.html?id=${recipe.id}`;
    card.className = 'recipe-card';

    // Create recipe metadata string
    let metaInfo = [];
    if (recipe.prep_time) metaInfo.push(`Prep: ${recipe.prep_time}`);
    if (recipe.cook_time && recipe.cook_time !== '0 minutes') {
        metaInfo.push(`Cook: ${recipe.cook_time}`);
    }
    if (recipe.total_time) metaInfo.push(`Total: ${recipe.total_time}`);
    if (recipe.servings) metaInfo.push(`Servings: ${recipe.servings}`);
    if (recipe.yield) metaInfo.push(recipe.yield);

    // Create dietary tags
    let dietaryTags = '';
    if (recipe.dietary_info && recipe.dietary_info.length > 0) {
        dietaryTags = recipe.dietary_info
            .slice(0, 3) // Show max 3 tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join('');
    }

    card.innerHTML = `
        <h2>${recipe.name}</h2>
        <div class="recipe-meta">
            ${metaInfo.map(info => `<span>${info}</span>`).join('')}
        </div>
        ${recipe.source ? `<p><em>Source: ${recipe.source}</em></p>` : ''}
        ${dietaryTags ? `<div class="dietary-tags">${dietaryTags}</div>` : ''}
    `;

    return card;
}

// Load recipes when page loads
document.addEventListener('DOMContentLoaded', loadRecipes);
