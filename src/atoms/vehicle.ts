import { atom } from 'recoil';
import { IVehicle } from '../utils/interface';

const vehicleAtom = atom({
  key: 'currentVehicle',
  default: 0 as string | number,
});

const vehicleListAtom = atom({
  key: 'vehicleList',
  default: [] as IVehicle[],
});

export { vehicleAtom, vehicleListAtom }