// Modifies a Provider based on a confirmation SMS (validate or delete)

const Provider = require('../models/Provider');
const getDate = require('../modules/getDate');
const formatHTML = require('../modules/formatHTML');

const { NEBOTS_SERVER } = process.env;

module.exports = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      _id: req.params.id
    }).exec();
    if (provider) {
      const { confirm, action } = req.query;
      if (!confirm) {
        console.log(`${getDate()} - Confirming provider ${action}`);
        return res.status(200).send(
          formatHTML(
            `<a style="color:#003146" href="${NEBOTS_SERVER}/provider/${_id}?action=${action}&confirm=true">
            Fes click aquí per ${
              action === 'delete' ? 'eliminar' : 'validar'
            } el teu compte
            </a>`
          )
        );
      } else {
        switch (action) {
          case 'validate':
            provider.valid = true;
            await provider.save();
            console.log(`${getDate()} - Provider validated`);
            return res
              .status(200)
              .send(formatHTML('Compte validat correctament'));
          case 'delete':
            Provider.deleteOne({ _id }, () => {});
            console.log(`${getDate()} - Deleting provider`);
            return res.status(200).send(formatHTML('Compte eliminat'));
          default:
            return res.status(200).send(formatHTML('Què volies fer?'));
        }
      }
    }
    console.error(`${getDate()} - Provider not found`);
    return res.status(400).send(formatHTML('Alguna cosa ha anat malament'));
  } catch (error) {
    console.error(`${getDate()} - Error modifying Provider: ${error.message}`);
    return res.status(500).send(formatHTML('Alguna cosa ha anat malament'));
  }
};
