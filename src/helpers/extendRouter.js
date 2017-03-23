import { createPath, addBasename, checkRelativePath } from './pathUtils';
import { HttpError } from './customErrors';

const pushReplace = basename => {
  return path => {
    checkRelativePath(path);
    const newPath = addBasename(path, basename);
    throw new HttpError(302, createPath(newPath));
  };
};

export default (router, basename) => {
  if (typeof window === 'undefined') {
    router.push = pushReplace(basename);
    router.replace = pushReplace(basename);
  }
  return router;
};
