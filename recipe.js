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
        <div class="mb-8">
            <h1 class="text-primary text-4xl md:text-5xl font-bold mb-4">${recipe.name}</h1>
            ${recipe.source ? `<p class="text-gray-600 italic text-lg"><em>Source: ${recipe.source}</em></p>` : ''}
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
            ${recipe.prep_time ? `<p class="mb-2"><strong class="text-primary">Prep Time:</strong> ${recipe.prep_time}</p>` : ''}
            ${recipe.cook_time ? `<p class="mb-2"><strong class="text-primary">Cook Time:</strong> ${recipe.cook_time}</p>` : ''}
            ${recipe.total_time ? `<p class="mb-2"><strong class="text-primary">Total Time:</strong> ${recipe.total_time}</p>` : ''}
            ${recipe.rise_time ? `<p class="mb-2"><strong class="text-primary">Rise Time:</strong> ${recipe.rise_time}</p>` : ''}
            ${recipe.cooling_time ? `<p class="mb-2"><strong class="text-primary">Cooling Time:</strong> ${recipe.cooling_time}</p>` : ''}
            ${recipe.servings ? `<p class="mb-2"><strong class="text-primary">Servings:</strong> ${recipe.servings}</p>` : ''}
            ${recipe.yield ? `<p class="mb-2"><strong class="text-primary">Yield:</strong> ${recipe.yield}</p>` : ''}
            ${recipe.oven_temp ? `<p class="mb-2"><strong class="text-primary">Oven Temperature:</strong> ${recipe.oven_temp}</p>` : ''}
            ${recipe.tin_size ? `<p class="mb-2"><strong class="text-primary">Tin Size:</strong> ${recipe.tin_size}</p>` : ''}
            ${recipe.use_within ? `<p class="mb-2"><strong class="text-primary">Use Within:</strong> ${recipe.use_within}</p>` : ''}
            ${recipe.dietary_info ? `<p class="mb-2 last:mb-0"><strong class="text-primary">Dietary Info:</strong> ${recipe.dietary_info.join(', ')}</p>` : ''}
        </div>
    `;

    // Ingredients section
    html += formatIngredients(recipe);

    // Equipment section (if present)
    if (recipe.equipment) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Equipment</h2>
                <ul class="space-y-3">
                    ${recipe.equipment.map(item => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Method section
    html += formatMethod(recipe);

    // Tips section (if present)
    if (recipe.tips) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Tips</h2>
                <ul class="space-y-3">
                    ${recipe.tips.map(tip => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Notes section (if present)
    if (recipe.notes) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Notes</h2>
                <ul class="space-y-3">
                    ${recipe.notes.map(note => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${note}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Golden Rules section (if present - for grilled cheese)
    if (recipe.golden_rules) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Golden Rules</h2>
                <ul class="space-y-3">
                    ${recipe.golden_rules.map(rule => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${rule}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Variations section (if present)
    if (recipe.variations) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Variations</h2>
                <ul class="space-y-3">
                    ${recipe.variations.map(variation => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${variation}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Topping Ideas section (if present - for financiers)
    if (recipe.topping_ideas) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Topping Ideas</h2>
                <ul class="space-y-3">
                    ${recipe.topping_ideas.map(topping => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${topping}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // How to Use section (if present - for pizza dough)
    if (recipe.how_to_use) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">How to Use</h2>
                <ul class="space-y-3">
                    ${recipe.how_to_use.map(step => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Serving Suggestions (if present)
    if (recipe.serving_suggestions) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Serving Suggestions</h2>
                <ul class="space-y-3">
                    ${recipe.serving_suggestions.map(suggestion => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${suggestion}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Alternative Wrapping (if present - for cheesecake)
    if (recipe.alternative_wrapping) {
        html += `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Alternative Wrapping Methods</h2>
                <ul class="space-y-3">
                    ${recipe.alternative_wrapping.map(method => `<li class="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-secondary before:text-2xl before:leading-none">${method}</li>`).join('')}
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
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Make-Ahead Instructions</h2>
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
        let html = '<div class="mb-10"><h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Ingredients</h2>';
        for (const [section, items] of Object.entries(recipe.ingredients)) {
            const sectionTitle = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<h3 class="text-primary text-2xl font-medium mt-6 mb-3">${sectionTitle}</h3>`;
            html += '<ul class="space-y-2">';
            items.forEach(ingredient => {
                html += `<li class="py-2 border-b border-gray-200 last:border-0">
                    <span class="font-semibold text-primary inline-block min-w-[100px]">${ingredient.amount}</span>
                    ${ingredient.item}
                    ${ingredient.notes ? `<span class="text-gray-600 italic text-sm"> (${ingredient.notes})</span>` : ''}
                </li>`;
            });
            html += '</ul>';
        }
        html += '</div>';
        return html;
    }

    // Simple array of ingredients
    let html = `
        <div class="mb-10">
            <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Ingredients</h2>
            <ul class="space-y-2">
    `;

    recipe.ingredients.forEach(ingredient => {
        html += `<li class="py-2 border-b border-gray-200 last:border-0">
            <span class="font-semibold text-primary inline-block min-w-[100px]">${ingredient.amount}</span>
            ${ingredient.item}
            ${ingredient.notes ? `<span class="text-gray-600 italic text-sm"> (${ingredient.notes})</span>` : ''}
        </li>`;
    });

    html += '</ul></div>';
    return html;
}

function formatMethod(recipe) {
    if (!recipe.method) return '';

    // Check if method is an object with subsections
    if (!Array.isArray(recipe.method)) {
        let html = '<div class="mb-10"><h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Method</h2>';
        for (const [section, steps] of Object.entries(recipe.method)) {
            const sectionTitle = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<h3 class="text-primary text-2xl font-medium mt-6 mb-3">${sectionTitle}</h3>`;
            html += '<ol class="method-list">';
            steps.forEach(step => {
                html += `<li class="relative pl-12 py-4 counter-increment-step before:content-[counter(step-counter)] before:absolute before:left-0 before:top-4 before:bg-primary before:text-white before:w-8 before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:font-semibold">${step}</li>`;
            });
            html += '</ol>';
        }
        html += '</div>';
        return html;
    }

    // Simple array of method steps
    let html = `
        <div class="mb-10">
            <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Method</h2>
            <ol class="method-list">
    `;

    recipe.method.forEach(step => {
        html += `<li class="relative pl-12 py-4 counter-increment-step before:content-[counter(step-counter)] before:absolute before:left-0 before:top-4 before:bg-primary before:text-white before:w-8 before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:font-semibold">${step}</li>`;
    });

    html += '</ol></div>';
    return html;
}

function formatStorage(storage) {
    if (typeof storage === 'string') {
        return `
            <div class="mb-10">
                <h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Storage</h2>
                <p>${storage}</p>
            </div>
        `;
    }

    let html = '<div class="mb-10"><h2 class="text-primary text-3xl font-semibold mb-4 pb-2 border-b-2 border-secondary">Storage</h2><div class="bg-gray-100 border-l-4 border-secondary p-6 mt-4">';

    if (storage.room_temp) {
        html += `<p class="mb-2"><strong>Room Temperature:</strong> ${storage.room_temp}</p>`;
    }
    if (storage.refrigerator) {
        html += `<p class="mb-2"><strong>Refrigerator:</strong> ${storage.refrigerator}</p>`;
    }
    if (storage.freezer) {
        html += `<p class="mb-2"><strong>Freezer:</strong> ${storage.freezer}</p>`;
    }
    if (storage.reheat) {
        html += `<p class="mb-2"><strong>Reheating:</strong> ${storage.reheat}</p>`;
    }
    if (storage.make_ahead) {
        html += `<p class="mb-2"><strong>Make-Ahead:</strong> ${storage.make_ahead}</p>`;
    }
    if (storage.freezing) {
        html += `<p class="mb-2"><strong>Freezing:</strong> ${storage.freezing}</p>`;
    }
    if (storage.best_results) {
        html += `<p class="mb-2 last:mb-0"><strong>Best Results:</strong> ${storage.best_results}</p>`;
    }

    html += '</div></div>';
    return html;
}

// Load recipe when page loads
document.addEventListener('DOMContentLoaded', loadRecipe);
