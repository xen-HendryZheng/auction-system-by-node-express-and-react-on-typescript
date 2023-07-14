import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { Bid } from './bid.entity';
import { Deposit } from './deposit.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryColumn({ name: 'user_id', generated: true, type: 'int' })
    userId: string;

    @Index({unique: true})
    @Column({ name: 'user_email', type: 'text' })
    userEmail = '';

    @Column({ name: 'user_password', type: 'text' })
    userPassword = '';

    @Column({ name: 'user_balance', type: 'decimal', default: 0, nullable: true })
    userBalance: number = 0;

    @Column({ name: 'user_last_login', type: 'timestamp with time zone', nullable: true })
    userLastLogin: Date | null = null;

    @CreateDateColumn({ name: 'user_created', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'  })
    userCreated: Date | null = null;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[];
  
    @OneToMany(() => Bid, (bid) => bid)
    bid: Bid[];
  
    @OneToMany(() => Deposit, (deposit) => deposit.depositUser)
    deposits: Deposit[];
}
