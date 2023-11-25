export const convertDateStringToNumber = (dateString: string): number => {
  const dateWithoutHypens = dateString.replace(/-/g, '');
  return Number(dateWithoutHypens);
};
