import moment from 'moment';
import { getSrc } from "gatsby-plugin-image"

export const kebabCase = (str) => {
  // this takes a spaced bit of text and effectively kebab cases it
  return (str.replace(' ', '-').toLowerCase());
};

export const pathDate = (date) => {
  // takes a date in proper ISO format and then spits it out for path
  if (typeof(date) === 'undefined') {
    return null;
  } else {
    return moment(date).format('YYYY/MM/DD');
  }
};

export const getFeaturedImageSources = (imageSharp) => {
  // parses image sharp values for featured images and returns a set
  // of proper URLs for the images

  let featuredImageSrc;
  try {
    featuredImageSrc = {
      base: getSrc(imageSharp.base),
      small: getSrc(imageSharp.small),
      medium: getSrc(imageSharp.medium),
      large: getSrc(imageSharp.large),
      wide: getSrc(imageSharp.wide)
    };
  } catch (e) {
    // just pass on it
    featuredImageSrc = undefined;
  }

  return featuredImageSrc;
}
