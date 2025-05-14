import { atom } from 'recoil';

const primaryColor = atom({
  key: 'primaryColor',
  default: 'rgb(0, 0, 0)',
});

const secondaryColor = atom({
  key: 'secondaryColor',
  default: 'rgb(0, 0, 0)'
});

export { primaryColor, secondaryColor };