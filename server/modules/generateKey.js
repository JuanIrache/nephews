const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

module.exports = len => {
  let result = '';
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * len);
    result += characters.slice(pos, pos + 1);
  }
  return result;
};
