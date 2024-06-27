new Vue({
    el: '#app',
    data: {
      ingredients: [],
      selectedIngredients: [],
      recipes: [],
      recipe: null
    },
    methods: {
      async fetchIngredients() {
        const response = await fetch('app/src/ingredientes.json');
        const data = await response.json();
        this.ingredients = data.ingredients;
        this.recipes = data.recipes;
      },
      cook() {
        this.recipe = this.recipes.find(r =>
          this.selectedIngredients.length >= 2 && 
          this.selectedIngredients.every(ing => r.ingredients.includes(ing))
        );
      }
    },
    created() {
      this.fetchIngredients();
    },
    template: `
      <div class="flex-container">        
        <div v-if="recipe" class="result">
          <h2>Felicidades has conseguido cocinar {{ recipe.name }}</h2>
          <p>Ingredientes:</p>
          <ul>
            <li v-for="ing in selectedIngredients" :key="ing">{{ ing }}</li>
          </ul>
          <img :src="recipe.image" alt="Imagen del plato">
        </div>
        <div v-else class="result">
          <h2>Resultados no encontrados</h2>
        </div>
        <div class="ingredients">
          <h3>Ingredientes</h3>
          <div v-for="(ingredient, index) in ingredients" :key="index">
            <input type="checkbox" :value="ingredient" v-model="selectedIngredients"> {{ ingredient }}
          </div>
          <button @click="cook">Cocinar</button>
        </div>
      </div>
    `
  });
  