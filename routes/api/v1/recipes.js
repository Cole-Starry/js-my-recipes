const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', (_, response) => {
  const summary = recipes.map(({ id, title, image, prepTime, difficulty }) => ({
    id,
    title,
    image,
    prepTime,
    difficulty
  }))
  response.json(summary)
})

router.post('/recipe/add', (request, response) => {
  const newRecipe = request.body

  const nextId = recipes.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1
  const recipeToAdd = { id: nextId, ...newRecipe }

  recipes.push(recipeToAdd)
  response.status(201).json(recipeToAdd)
})

router.get('/recipe/:id', (request, response) => {
  const recipeId = Number(request.params.id)
  const recipe = recipes.find((item) => item.id === recipeId)

  if (!recipe) {
    return response.status(404).json({ error: 'Recipe not found' })
  }

  response.json(recipe)
})

module.exports = router
