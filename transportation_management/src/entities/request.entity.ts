import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { InformationEntity } from './information.entity';
import { OrderEntity } from './order.entity';
import { RequestRecordEntity } from './request-record.entity';

@Entity('Request')
export class RequestEntity extends AbstractEntity {
    @PrimaryGeneratedColumn({ name: 'request_id' })
    public requestId: number;

    @Column({ name: 'record_id' })
    public recordId: number;

    @ManyToOne(() => RequestRecordEntity, { eager: true })
    @JoinColumn({ name: 'record_id' })
    requesrRecord: RequestRecordEntity;

    @Column({ name: 'order_id', nullable: false })
    public orderId: number;

    @Column({ name: 'pickup_infor', nullable: true })
    pickupInfor: number;

    @Column({ name: 'new_price', nullable: true })
    new_price: number;

    @Column({ name: 'deliver_infor', nullable: true })
    deliverInfor: number;

    @ManyToOne(() => InformationEntity, { eager: true })
    @JoinColumn({ name: 'pickup_infor' })
    pickupInformation: InformationEntity;

    @ManyToOne(() => InformationEntity, { eager: true })
    @JoinColumn({ name: 'deliver_infor' })
    deliverInformation: InformationEntity;

    @ManyToOne(() => OrderEntity, { eager: true })
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
}
