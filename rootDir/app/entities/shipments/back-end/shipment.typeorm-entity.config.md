import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('shipments')
export class ShipmentEntity extends BaseEntity {
@Column()
folio: string;
@Column()
shipmentNumber: string;

@Column('timestamp')
shipmentDate: Date;

@Column('timestamp')
shipmentArrivalDate: Date;

@Column()
shipmentInstructions: string;

@Column()
shipmentHour: string;

@Column()
shipmentTemperature: string;

@Column({ enum: InvoiceTerms })
incoterms: string;

@Column({ enum: InvoiceTerms })
transportType: string;

@ManyToOne(
() => CommercialEntityEntity,
(commercialEntity) => commercialEntity.invoices,
)
@JoinColumn({ name: 'customer_id' })
customer: CommercialEntityEntity;

@Column()
customerId: string;
//
// @ManyToOne(() => AddressEntity, (addressEntity) => addressEntity.invoices)
// @JoinColumn({ name: 'shipping_address_id' })
// shippingAddress: AddressEntity;
//
// @Column()
// shippingAddressId: string;
//
// @Column()
// po: string;
// @Column()
// shipmentReference: string;
// @Column({ enum: InvoiceTerms })
// invoiceTerms: string;
// @Column({ enum: InvoiceNoteStatus, default: InvoiceNoteStatus.Draft })
// status: string;
//
// @Column({ enum: InvoiceNoteCategory, default: InvoiceNoteCategory.Passing })
// category: string;
//
// @OneToMany(
//   () => InvoiceNoteItemEntity,
//   (invoiceNoteItem) => invoiceNoteItem.invoiceNote,
// )
// noteItems: InvoiceNoteItemEntity[];
}
