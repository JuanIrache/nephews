// Tries to format the phone as a Spanish number with the international prefix

module.exports = phone => {
  phone = phone.replace(/^00/, '+');
  phone = phone.replace(/[- ]/g, '');
  // Add Spanish prefix if missing
  if (phone.slice(0, 3) != '+34') {
    phone = '+34' + phone;
  }
};
