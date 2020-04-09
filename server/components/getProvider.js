const Provider = require('../models/Provider');

module.exports = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      _id: req.params.id
    }).exec();
    if (provider) {
      switch (req.query.action) {
        case 'validate':
          provider.valid = true;
          await provider.save();
          return res.status(200).send('<h1>Compte validat correctament</h1>');
        case 'delete':
          Provider.deleteOne({ _id: req.params.id }, () => {});
          return res.status(200).send('<h1>Compte eliminat</h1>');
        default:
          return res.status(200).send('<h1>Què volies fer?</h1>');
      }
    }
    return res.status(400).send('<h1>Alguna cosa ha anat malament</h1>');
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1>Alguna cosa ha anat malament</h1>');
  }
};
