// Gets current date for logs

module.exports = () => {
  return new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid'
  });
};
