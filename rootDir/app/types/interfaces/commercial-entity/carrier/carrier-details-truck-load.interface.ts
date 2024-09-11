import { IContact } from '../../catalog/contact.interface';
import { ICarrierVehicle } from './carrier-vehicle.interface';
import { ICarrierContainer } from './carrier-container.interface';

export interface ITruckLoadCarrierDetails {
  shipmentId: string;
  driver: IContact;
  vehicle: ICarrierVehicle;
  container: ICarrierContainer;
}
