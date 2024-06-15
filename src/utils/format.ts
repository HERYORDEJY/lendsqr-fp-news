export const isDataEmpty = (data: Array<any> | null | undefined) => {
  if (data === null) {
    return true;
  }

  if (data === undefined) {
    return true;
  }

  if (Array.isArray(data)) {
    return data.length === 0;
  }

  throw new Error('Invalid data format');
};
