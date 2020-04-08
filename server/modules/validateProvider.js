const Provider = require('../models/Provider');

module.exports = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      _id: req.params.id,
      validateKey: req.params.key
    }).exec();
    if (provider) {
      provider.valid = true;
      await provider.save();
      return res.status(200).send('<h1>Compte validat correctament</h1>');
    } else {
      return res.status(400).send('<h1>Alguna cosa ha anat malament</h1>');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1>Alguna cosa ha anat malament</h1>');
  }
};
