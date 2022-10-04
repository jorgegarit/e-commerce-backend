const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find All
  Category.findAll({
    include: {

      // will be using the product model to call the correct attribute columns
      model: Product,

      // these attributes will be based on the colums created form the product model
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No Catergories were found' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
