import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import * as bcrypt from 'bcrypt';

// Define the possible roles
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn() uid: number;
    @Column() fname: string;
    @Column() lname: string;
    @Column({ unique: true }) email: string;
    @Column({ nullable: true }) phoneNum: string;
    @Column({ type: 'date', nullable: true }) DOB: string;
    @Column({ nullable: true }) address: string;
    @Column({ nullable: true }) gender: string;
    @Column() password: string;

    // THIS IS THE NEW FIELD
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER, // By default, new users are not admins
    })
    role: UserRole;

    @OneToMany(() => Order, order => order.user) orders: Order[];
    @OneToMany(() => Rating, rating => rating.user) ratings: Rating[];
}
