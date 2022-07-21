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
