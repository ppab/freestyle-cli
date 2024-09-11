import { ITruckLoadCarrierDetails } from './carrier-details-truck-load.interface';

export type ICarrierDetails =
  | { [key: string]: string } // Default generic structure
  | ITruckLoadCarrierDetails; // Specific type for certain transport types
