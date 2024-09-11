```ts
import {
    IsString,
    IsEnum,
    IsOptional,
    IsUUID,
    IsDateString,
    IsNotEmpty,
} from 'class-validator';
import {AddressCategory} from '../enums/address-category.enum';
import {IProvider} from '../../../types/interfaces/commercial-entity/provider.commercial-entity.interface';
import {TransportTypeEnum} from '../../../types/enums/transportTypeEnum';
import {ICarrier} from '../../../types/interfaces/commercial-entity/carrier/carrier.interface';
import {ICarrierDetails} from '../../../types/interfaces/commercial-entity/carrier/carrier-details.type';

export class CreateCarrierVehicleDto {
    @IsOptional()
    @IsString()
    description: string;
    @IsString()
    plate: string;
    @IsUUID()
    @IsString()
    carrierId: string;
}
```