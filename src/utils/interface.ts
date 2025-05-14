export interface IVehicle {
  id: number;
  name: string;
  model?: string;
  image: string;
  price: number;
  combustibleType: string;
  seats: number;
  doors: number;
  weight: number;
}