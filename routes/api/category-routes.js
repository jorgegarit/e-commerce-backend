const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all the categories
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
      res.status(404).json({ message: 'No catergories were found' });
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
  // find one category based on specific generated id 
  Category.findOne({

    // this decalres that we will be using a specific id 
    where: {
      id: req.params.id
    },
    // will be using the same model and attributes as the find all call
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] 
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No catergory was found using that ID' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  }); 
});

router.post('/', (req, res) => {
  // User can create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  // user can update a category using its id 
  Category.update(req.body, {
    // defines that update will be based on specific id 
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'Cannot update. No category was found using that ID' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  }); 
});

router.delete('/:id', (req, res) => {
  // user can delete a category by its specific id 
  Category.destroy({
    // will use where to find specific id for user to delete
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'Cannot delete. No category was found using that ID' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  }); 
});

module.exports = router;
