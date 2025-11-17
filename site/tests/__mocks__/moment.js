const moment = jest.fn(() => ({
  format: (formatStr) => {
    if (formatStr === 'YYYY/MM/DD') {
      return '2021/08/05';
    }
    return 'Mon, Jan 1st 2024';
  },
}));

module.exports = moment;
module.exports.default = moment;
module.exports.moment = moment;
