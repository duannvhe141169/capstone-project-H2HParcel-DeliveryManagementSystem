import { RoleEntity } from 'src/module/web/role/entity/role';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
@Entity('Account')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    public acc_id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column({ default: 1 })
    public role_id: number;

    @ManyToOne(() => RoleEntity, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @Column({ nullable: true })
    refresh_token: string;

    @Column({ default: true })
    public isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_create_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    date_update_at: Date;
}