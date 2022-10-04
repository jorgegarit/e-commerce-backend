const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // user can serach for all tags
  Tag.findAll({
    // will add the tags own attributes and then also include attributes from product model
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

router.get('/:id', (req, res) => {
  // user can serach for one tage using its specific id 
  Tag.findOne({
    // using where to find specific id 
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: 'No tag was found using that ID' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
