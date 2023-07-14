import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Deposit extends BaseEntity {
    @PrimaryColumn({ name: 'deposit_id', generated: true, type: 'int' })
    depositId = 0;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'deposit_user_id', referencedColumnName: 'userId'  })
    depositUser: User | undefined;

    @Column({ name: 'deposit_user_id' , type: 'int' })
    depositUserId: number = 0;

    @Column({ name: 'deposit_credit', type: 'decimal', nullable: true, default: 0 })
    depositCredit = 0;

    @Column({ name: 'deposit_debit', type: 'decimal', nullable: true,default: 0 })
    depositDebit = 0;

    @Column({ name: 'deposit_desc', type: 'text', nullable: true })
    depositDesc = '';

    @CreateDateColumn({ name: 'deposit_created', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    depositCreated: Date | null = null;
}
