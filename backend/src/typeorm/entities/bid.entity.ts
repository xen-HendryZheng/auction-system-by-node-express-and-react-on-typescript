import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
  } from 'typeorm';
  import { Item } from './item.entity';
  import { User } from './user.entity';
  
  @Entity()
  export class Bid extends BaseEntity {
    @PrimaryColumn({ name: 'bid_id', generated: true, type: 'int' })
    bidId = 0;
  
    @ManyToOne(() => Item)
    @JoinColumn({ name: 'bid_item_id', referencedColumnName: 'itemId'  })
    bidItem: Item | undefined;

    @Column({ name: 'bid_item_id', type: 'decimal' })
    bidItemId = 0;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'bid_user_id' })
    bidUser: User | undefined;

    @Column({ name: 'bid_user_id', type: 'decimal' })
    bidUserId = 0;
  
    @Column({ name: 'bid_price', type: 'decimal' })
    bidPrice = 0;
  
    @Column({ name: 'bid_winner', type: 'boolean', default: false })
    bidWinner = false;
  
    @CreateDateColumn({ name: 'bid_created', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    bidCreated: Date | null = null;
  }
  