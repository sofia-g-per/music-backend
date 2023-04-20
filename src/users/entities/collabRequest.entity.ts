import { AutoMap } from "@automapper/classes";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RequestStatus } from "./requestStatus.entity";
import { User } from "./user.entity";

export abstract class CollabRequest {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creation_date: Date;

    @UpdateDateColumn()
    updated_date: Date;
        
    @ManyToOne(() => RequestStatus, requestStatus => requestStatus.requests)
    @JoinColumn({ name: 'status', referencedColumnName: 'name' })
    status: RequestStatus;

    @ManyToOne(() => User, user => user.id)
    sender: User;

    @ManyToOne(() => User, user => user.id)
    recipient: User;
}
