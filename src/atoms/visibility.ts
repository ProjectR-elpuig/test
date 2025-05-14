import { atom } from 'recoil';

const visibility = atom({
  key: 'visibility',
  default: false,
});

export { visibility };