module.exports = () => {
  return new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid'
  });
};
