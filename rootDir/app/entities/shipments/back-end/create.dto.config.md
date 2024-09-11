import {
IsString,
IsEnum,
IsOptional,
IsUUID,
IsDateString,
IsNotEmpty,
} from 'class-validator';
import { AddressCategory } from '../enums/address-category.enum';
import { IProvider } from '../../../types/interfaces/commercial-entity/provider.commercial-entity.interface';
import { TransportTypeEnum } from '../../../types/enums/transportTypeEnum';
import { ICarrier } from '../../../types/interfaces/commercial-entity/carrier/carrier.interface';
import { ICarrierDetails } from '../../../types/interfaces/commercial-entity/carrier/carrier-details.type';

export class CreateAddressDto {
@IsString()
folio: string;
@IsString()
shipmenNumber: string;
@IsUUID()
@IsString()
customerId: string;
@IsString()
@IsEnum(AddressCategory)
incoterms: string;
@IsString()
shipmentDate: Date;
@IsDateString()
@IsNotEmpty()
shipmentArrivalDate: string;
@IsDateString()
@IsNotEmpty()
shipmentInstructions: string;
@IsString()
shipmentHour: Date;
@IsString()
shipmentTemperature: string;
///->Carrier
@IsString()
@IsEnum(AddressCategory)
transportType: TransportTypeEnum;

// ////->After creation
// @IsUUID()
// @IsString()
// customerContactId: string;
//
// ////After Creation
// @IsUUID()
// @IsString()
// shipmentAddressId: string;
// @IsUUID()
// @IsString()
// facturaId: string;

// @IsUUID()
// @IsString()
// customsAgentMxId: string;

// @IsUUID()
// @IsString()
// customsAgentUsaId: string;

// @IsUUID()
// @IsString()
// carrierId: string;

// @IsUUID()
// @IsString()
// carrierDetailsId: string;

// @IsUUID()
// @IsString()
// growerPO: string;

// @IsUUID()
// @IsString()
// customerPO: string;
}
