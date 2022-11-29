const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await
      Tag.findAll({
        include: [
          {
            model: Product,
            through: ProductTag
          }
        ]
      })
    if (!allTags) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await
      Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Product,
            through: ProductTag
          }]
      })
    if (!oneTag) {
      res.status(404).json({ message: 'No tag found' });
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  
    const createTag = await
    Tag.create(req.body)
    if (!createTag) {
      res.status(500).json({ message: 'failed to create tag'});
    } else res.status(200).json(createTag);
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  if (!updateTag) {
    res.status(500).json({ message: 'failed to update tag' });
    
  } else res.status(200).json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteTag) {
      res.status(400).json({ message: 'failed to delete tag' });
      
    } else res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
