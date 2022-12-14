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
  // user can create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

router.put('/:id', (req, res) => {
  // User can update a specific tage using its ID
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: 'Cannot update. No tag was found using that ID' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

router.delete('/:id', (req, res) => {
  // duser can delete a tag by its specific id 
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: 'Cannot delete. No tag was found using that ID' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });   
});

module.exports = router;
