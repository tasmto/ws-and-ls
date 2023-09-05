const colors = {
  positive: 'rgb(59, 220, 148)',
  negative: 'rgb(255, 88, 89)',
  dark: 'rgb(29, 25, 43)',
  nuetral: 'rgb(93, 91, 93)',
  light: 'rgb(255, 255, 255)',
};

export const returnRGBNumber = (color: string) => {
  const rgb = color.replace('rgb(', '').replace('rgba(', '').replace(')', '');
  return rgb;
};
export default colors;
