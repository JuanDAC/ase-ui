// TODO: create this file like a library and export it as a module of dependencies like aseprite package manager.
// with self repository as aseprite package manager.

export const deepCopy = (obj: any): any => {
  if (typeof obj === 'object' && Array.isArray(obj)) {
    return [...obj].map((item) => deepCopy(item));
  }

  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries({ ...obj }).map(([key, value]) => {
        return [key, deepCopy(value)];
      })
    );
  }

  return obj;
};
