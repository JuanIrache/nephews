// Modifies a Provider based on a confirmation SMS (validate or delete)

const Provider = require('../models/Provider');
const getDate = require('../modules/getDate');
const formatHTML = require('../modules/formatHTML');

const { NES_SERVER } = process.env;

module.exports = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const provider = await Provider.findOne({ _id }).exec();
    if (provider) {
      const { confirm, action } = req.query;
      if (!confirm) {
        console.log(
          `${getDate()} - Asking for provider ${action} confirmation`
        );
        return res.status(200).send(
          formatHTML({
            link: {
              text: `Click here to ${
                action === 'delete' ? 'delete' : 'validate'
              } your account`,
              url: `${NES_SERVER}/provider/${_id}?action=${action}&confirm=true`
            }
          })
        );
      } else {
        switch (action) {
          case 'validate':
            provider.valid = true;
            await provider.save();
            console.log(`${getDate()} - Provider validated`);
            return res
              .status(200)
              .send(formatHTML({ title: 'Account validated' }));
          case 'delete':
            Provider.deleteOne({ _id }, () => {});
            console.log(`${getDate()} - Deleting provider`);
            return res
              .status(200)
              .send(formatHTML({ title: 'Account deleted' }));
          default:
            return res
              .status(400)
              .send(formatHTML('What were you trying to do?'));
        }
      }
    }
    console.error(`${getDate()} - Provider not found`);
    return res.status(400).send(formatHTML({ title: 'Something went wrong' }));
  } catch (error) {
    console.error(`${getDate()} - Error modifying Provider: ${error.message}`);
    return res.status(500).send(formatHTML({ title: 'Something went wrong' }));
  }
};
