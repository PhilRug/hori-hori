const dayjs = require('dayjs');

module.exports = {

  format_date: (date) => {
    const current = dayjs(date);
    return current.format('MMM/DD/YYYY');
  }

};
