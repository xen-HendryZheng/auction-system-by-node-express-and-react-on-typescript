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
export class Item extends BaseEntity {
    @PrimaryColumn({ name: 'item_id', generated: true, type: 'int' })
    itemId: number;

    @ManyToOne(() => User, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'item_user_id', referencedColumnName: 'userId'  })
    user: User | undefined;

    @Column({ name: 'item_user_id' , type: 'int', nullable: true })
    itemUserId: number = 0;

    @Column({ name: 'item_name', type: 'text' })
    itemName = '';

    @Column({ name: 'item_start_price', type: 'decimal', nullable: true })
    itemStartPrice = 0;

    @Column({ name: 'item_end_price', type: 'decimal', nullable: true })
    itemEndPrice = 0;

    @Column({ name: 'item_time_window', type: 'decimal', default: 1 })
    itemTimeWindow = 1;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'item_created_by', referencedColumnName: 'userId' })
    userCreatedBy: User | undefined;

    @Column({ name: 'item_created_by' , type: 'int'})
    itemCreatedBy: number = 0;

    @Column({ name: 'item_status', type: 'text', default: 'Pending' })
    itemStatus = '';

    @CreateDateColumn({ name: 'item_created', type: 'timestamp with time zone', default:() => 'CURRENT_TIMESTAMP' })
    itemCreated: Date | null = null;

    @Column({ name: 'item_published_at', type: 'timestamp with time zone', nullable: true})
    itemPublishedAt: Date | null = null;
}
