const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });
    if (!allCategories) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
        }
      ]
    })
    if (!oneCategory) {
      res.status(404).json({ message: 'No category found by that id' });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const createCategory = await Category.create({
    category_name: req.body.category_name
  })
  if (!createCategory) {
    res.status(500).json({ message: 'failed to create category' });
    return;
  } else res.status(201).json(createCategory);

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  if (!updateCategory) {
    res.status(500).json({ message: 'failed to update category' });
    
  } else res.status(200).json(updateCategory);

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteCategory) {
      res.status(500).json({ message: 'failed to delete category' });
      
    } else res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

module.exports = router;
