import moment from 'moment';

export const kebabCase = (str = '') => {
  // this takes a spaced bit of text and effectively kebab cases it
  if (!str) {
    return '';
  }
  const regex = /\s+/g;
  return (str.replaceAll(regex, '-').toLowerCase());
};

export const pathDate = (date) => {
  // takes a date in proper ISO format and then spits it out for path
  if (typeof(date) === 'undefined') {
    return null;
  } else {
    return moment(date).format('YYYY/MM/DD');
  }
};
