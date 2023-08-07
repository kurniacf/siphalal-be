import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    username: string;
    
    @Column()
    password: string;

    constructor(username: string, password: string) {
        this.id = uuid() as string;
        this.username = username;
        this.password = password;
    }
}
