import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CollabRequest } from "./collabRequest.entity";
import { SongCollabRequest } from "./songCollabRequest.entity";

@Entity("request_statuses")
export class RequestStatus{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => SongCollabRequest, songCollabRequest => songCollabRequest.status)
    requests: SongCollabRequest[];
}