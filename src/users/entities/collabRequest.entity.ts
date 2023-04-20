import { AutoMap } from "@automapper/classes";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    status: RequestStatus;

    @ManyToOne(() => User, user => user.id)
    sender: User;

    @ManyToOne(() => User, user => user.id)
    recipient: User;
}
