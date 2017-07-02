// @flow

/**
 * Returns data age in secodns
 */
export const getDataAge = (timestamp: Date): number => {
  const now = new Date();
  const dataAge = (now.getTime() - timestamp.getTime()) / 1000;
  return dataAge;
};
