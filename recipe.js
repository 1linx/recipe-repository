// Load and display individual recipe details
async function loadRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));

    if (!recipeId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('recipes.json');
        const data = await response.json();
        const recipe = data.recipe_collection.recipes.find(r => r.id === recipeId);

        if (!recipe) {
            window.location.href = 'index.html';
            return;
        }

        displayRecipe(recipe);
    } catch (error) {
        console.error('Error loading recipe:', error);
        document.getElementById('recipe-detail').innerHTML =
            '<p>Error loading recipe. Please try again later.</p>';
    }
}

function displayRecipe(recipe) {
    document.title = `${recipe.name} - Recipe Collection`;

    const recipeDetail = document.getElementById('recipe-detail');
    let html = `
        <div class="recipe-header">
            <h1>${recipe.name}</h1>
            ${recipe.source ? `<p><em>Source: ${recipe.source}</em></p>` : ''}
        </div>

        <div class="recipe-info">
            ${recipe.prep_time ? `<p><strong>Prep Time:</strong> ${recipe.prep_time}</p>` : ''}
            ${recipe.cook_time ? `<p><strong>Cook Time:</strong> ${recipe.cook_time}</p>` : ''}
            ${recipe.total_time ? `<p><strong>Total Time:</strong> ${recipe.total_time}</p>` : ''}
            ${recipe.rise_time ? `<p><strong>Rise Time:</strong> ${recipe.rise_time}</p>` : ''}
            ${recipe.cooling_time ? `<p><strong>Cooling Time:</strong> ${recipe.cooling_time}</p>` : ''}
            ${recipe.servings ? `<p><strong>Servings:</strong> ${recipe.servings}</p>` : ''}
            ${recipe.yield ? `<p><strong>Yield:</strong> ${recipe.yield}</p>` : ''}
            ${recipe.oven_temp ? `<p><strong>Oven Temperature:</strong> ${recipe.oven_temp}</p>` : ''}
            ${recipe.tin_size ? `<p><strong>Tin Size:</strong> ${recipe.tin_size}</p>` : ''}
            ${recipe.use_within ? `<p><strong>Use Within:</strong> ${recipe.use_within}</p>` : ''}
            ${recipe.dietary_info ? `<p><strong>Dietary Info:</strong> ${recipe.dietary_info.join(', ')}</p>` : ''}
        </div>
    `;

    // Ingredients section
    html += formatIngredients(recipe);

    // Equipment section (if present)
    if (recipe.equipment) {
        html += `
            <div class="recipe-section">
                <h2>Equipment</h2>
                <ul class="notes-list">
                    ${recipe.equipment.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Method section
    html += formatMethod(recipe);

    // Tips section (if present)
    if (recipe.tips) {
        html += `
            <div class="recipe-section">
                <h2>Tips</h2>
                <ul class="tips-list">
                    ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Notes section (if present)
    if (recipe.notes) {
        html += `
            <div class="recipe-section">
                <h2>Notes</h2>
                <ul class="notes-list">
                    ${recipe.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Golden Rules section (if present - for grilled cheese)
    if (recipe.golden_rules) {
        html += `
            <div class="recipe-section">
                <h2>Golden Rules</h2>
                <ul class="tips-list">
                    ${recipe.golden_rules.map(rule => `<li>${rule}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Variations section (if present)
    if (recipe.variations) {
        html += `
            <div class="recipe-section">
                <h2>Variations</h2>
                <ul class="notes-list">
                    ${recipe.variations.map(variation => `<li>${variation}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Topping Ideas section (if present - for financiers)
    if (recipe.topping_ideas) {
        html += `
            <div class="recipe-section">
                <h2>Topping Ideas</h2>
                <ul class="notes-list">
                    ${recipe.topping_ideas.map(topping => `<li>${topping}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // How to Use section (if present - for pizza dough)
    if (recipe.how_to_use) {
        html += `
            <div class="recipe-section">
                <h2>How to Use</h2>
                <ul class="notes-list">
                    ${recipe.how_to_use.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Serving Suggestions (if present)
    if (recipe.serving_suggestions) {
        html += `
            <div class="recipe-section">
                <h2>Serving Suggestions</h2>
                <ul class="notes-list">
                    ${recipe.serving_suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Alternative Wrapping (if present - for cheesecake)
    if (recipe.alternative_wrapping) {
        html += `
            <div class="recipe-section">
                <h2>Alternative Wrapping Methods</h2>
                <ul class="notes-list">
                    ${recipe.alternative_wrapping.map(method => `<li>${method}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Storage section (if present)
    if (recipe.storage) {
        html += formatStorage(recipe.storage);
    }

    // Make-ahead info (if present and not in storage object)
    if (recipe.make_ahead && typeof recipe.make_ahead === 'string') {
        html += `
            <div class="recipe-section">
                <h2>Make-Ahead Instructions</h2>
                <p>${recipe.make_ahead}</p>
            </div>
        `;
    }

    recipeDetail.innerHTML = html;
}

function formatIngredients(recipe) {
    if (!recipe.ingredients) return '';

    // Check if ingredients is an object with subsections (like crust, filling, etc.)
    if (!Array.isArray(recipe.ingredients)) {
        let html = '<div class="recipe-section"><h2>Ingredients</h2>';
        for (const [section, items] of Object.entries(recipe.ingredients)) {
            const sectionTitle = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<h3>${sectionTitle}</h3>`;
            html += '<ul class="ingredient-list">';
            items.forEach(ingredient => {
                html += `<li>
                    <span class="ingredient-amount">${ingredient.amount}</span>
                    ${ingredient.item}
                    ${ingredient.notes ? `<span class="ingredient-notes"> (${ingredient.notes})</span>` : ''}
                </li>`;
            });
            html += '</ul>';
        }
        html += '</div>';
        return html;
    }

    // Simple array of ingredients
    let html = `
        <div class="recipe-section">
            <h2>Ingredients</h2>
            <ul class="ingredient-list">
    `;

    recipe.ingredients.forEach(ingredient => {
        html += `<li>
            <span class="ingredient-amount">${ingredient.amount}</span>
            ${ingredient.item}
            ${ingredient.notes ? `<span class="ingredient-notes"> (${ingredient.notes})</span>` : ''}
        </li>`;
    });

    html += '</ul></div>';
    return html;
}

function formatMethod(recipe) {
    if (!recipe.method) return '';

    // Check if method is an object with subsections
    if (!Array.isArray(recipe.method)) {
        let html = '<div class="recipe-section"><h2>Method</h2>';
        for (const [section, steps] of Object.entries(recipe.method)) {
            const sectionTitle = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<h3>${sectionTitle}</h3>`;
            html += '<ol class="method-list">';
            steps.forEach(step => {
                html += `<li>${step}</li>`;
            });
            html += '</ol>';
        }
        html += '</div>';
        return html;
    }

    // Simple array of method steps
    let html = `
        <div class="recipe-section">
            <h2>Method</h2>
            <ol class="method-list">
    `;

    recipe.method.forEach(step => {
        html += `<li>${step}</li>`;
    });

    html += '</ol></div>';
    return html;
}

function formatStorage(storage) {
    if (typeof storage === 'string') {
        return `
            <div class="recipe-section">
                <h2>Storage</h2>
                <p>${storage}</p>
            </div>
        `;
    }

    let html = '<div class="recipe-section"><h2>Storage</h2><div class="storage-info">';

    if (storage.room_temp) {
        html += `<p><strong>Room Temperature:</strong> ${storage.room_temp}</p>`;
    }
    if (storage.refrigerator) {
        html += `<p><strong>Refrigerator:</strong> ${storage.refrigerator}</p>`;
    }
    if (storage.freezer) {
        html += `<p><strong>Freezer:</strong> ${storage.freezer}</p>`;
    }
    if (storage.reheat) {
        html += `<p><strong>Reheating:</strong> ${storage.reheat}</p>`;
    }
    if (storage.make_ahead) {
        html += `<p><strong>Make-Ahead:</strong> ${storage.make_ahead}</p>`;
    }
    if (storage.freezing) {
        html += `<p><strong>Freezing:</strong> ${storage.freezing}</p>`;
    }
    if (storage.best_results) {
        html += `<p><strong>Best Results:</strong> ${storage.best_results}</p>`;
    }

    html += '</div></div>';
    return html;
}

// Load recipe when page loads
document.addEventListener('DOMContentLoaded', loadRecipe);
