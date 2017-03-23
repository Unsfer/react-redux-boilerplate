import { createPath } from './pathUtils';
import { HttpError } from './customErrors';
import isPlainObject from 'lodash/isPlainObject';

export default (location, params) => {
  if (!isPlainObject(location) || location === null) {
    throw new Error('Parameter location should be object');
  }
  if (!isPlainObject(params) || params === null) {
    throw new Error('Parameter params should be object');
  }

  const newLocation = Object.assign({}, location);
  newLocation.basename = newLocation.basename || '';
  newLocation.params = params;

  if (typeof window !== 'undefined') {
    newLocation.assign = path => {
      window.location.assign(createPath(path));
    };
    newLocation.reload = forceGet => {
      window.location.reload(forceGet);
    };
    newLocation.replace = path => {
      window.location.replace(createPath(path));
    };
  } else {
    newLocation.assign = path => {
      throw new HttpError(302, createPath(path));
    };
    newLocation.reload = () => {
      throw new HttpError(302, `${location.basename}${location.pathname}${location.search}${location.hash}`);
    };
    newLocation.replace = path => {
      throw new HttpError(302, createPath(path));
    };
  }
  return newLocation;
};
