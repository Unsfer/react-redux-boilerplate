import qs from 'qs';
import isPlainObject from 'lodash/isPlainObject';

export const createPath = path => {
  if (isPlainObject(path)) {
    if (typeof path.pathname !== 'string') {
      throw new Error('Property pathname must be string');
    }
    let queryString = '';
    if (path.query) {
      if (!isPlainObject(path.query)) {
        throw new Error('Property query must be plain object');
      }
      queryString = qs.stringify(path.query, { arrayFormat: 'brackets' }).replace(/%20/g, '+');
    }
    if (queryString === '') {
      return path.pathname;
    }
    return `${path.pathname}${path.pathname.indexOf('?') !== -1 ? '&' : '?'}${queryString}`;
  }
  return path;
};

export const addBasename = (path, basename) => {
  if ((!isPlainObject(path) && typeof path !== 'string') || path === null) {
    throw new Error('Parameter path must be plain object or string');
  }
  if (typeof basename !== 'string') {
    throw new Error('Parameter basename must be string');
  }
  let newPath = path;
  if (basename.length) {
    if (typeof newPath === 'string') {
      newPath = `${basename}${newPath}`;
    } else {
      if (typeof newPath.pathname !== 'string') {
        throw new Error('Property pathname must be string');
      }
      newPath.pathname = `${basename}${newPath.pathname}`;
    }
  }
  return newPath;
};

export const checkRelativePath = path => {
  if (typeof path !== 'string' && !isPlainObject(path)) {
    throw new Error(`Parameter path must be plain object or string`);
  }
  let checkedPath = path;
  if (typeof checkedPath !== 'string') {
    if (typeof checkedPath.pathname !== 'string') {
      throw new Error('Property pathname must be string');
    }
    checkedPath = checkedPath.pathname;
  }

  const match = checkedPath.match(/^https?:\/\/[^\/]*/); // eslint-disable-line
  if (match) {
    throw new Error(`A path must be relative URL, not a fully qualified URL like "${checkedPath}"`);
  }
};
