```ts

import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('carrier-vehicle')
export class CarrierVehicle extends BaseEntity {

    @Column({nulable: true})
    description: string

    @Column()
    plate: string


    @ManyToOne(
        () => CommercialEntityEntity,
        (commercialEntity) => commercialEntity.vehicles,
    )
    @JoinColumn({name: 'customer_id'})
    carrier: CommercialEntityEntity;

    @Column()
    carrierId: string;
//

}
```
