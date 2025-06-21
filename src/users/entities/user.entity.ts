import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { Follow } from '../../follows/entities/follow.entity';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phoneNum: string;

    @Column({ type: 'date', nullable: true })
    DOB: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    gender: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
    
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];

    @OneToMany(() => Follow, follow => follow.user)
    following: Follow[];
    // The @BeforeInsert hook has been REMOVED from this file.
}
