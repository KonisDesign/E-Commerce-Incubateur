const Shoe = require('../models/shoe.model');

exports.getShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get products' });
  }
};

exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.json(shoe);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get product' });
  }
};
