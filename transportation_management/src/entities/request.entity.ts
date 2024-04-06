import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { InformationEntity } from './information.entity';
import { OrderEntity } from './order.entity';
import { RequestRecordEntity } from './request-record.entity';
import { TransitEntity } from './transit.entity';

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

    @OneToMany(() => RequestEntity, (request) => request.requesrRecord)
    requests: RequestEntity[];
    @OneToMany(() => TransitEntity, (transit) => transit.requesrRecord)
    transits: TransitEntity[];
    @Column({ name: 'pickup_infor', nullable: true })
    pickupInfor: number;

    @Column({ name: 'deliver_infor', nullable: true })
    deliverInfor: number;

    @OneToOne(() => InformationEntity, { eager: true })
    @JoinColumn({ name: 'pickup_infor' })
    pickupInformation: InformationEntity;

    @OneToOne(() => InformationEntity, { eager: true })
    @JoinColumn({ name: 'deliver_infor' })
    deliverInformation: InformationEntity;

    @ManyToOne(() => OrderEntity, { eager: true })
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
}
