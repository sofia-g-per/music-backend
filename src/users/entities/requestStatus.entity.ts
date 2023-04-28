import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CollabRequest } from "./collabRequest.entity";
import { SongCollabRequest } from "./songCollabRequest.entity";

@Entity("request_statuses")
export class RequestStatus{

    @PrimaryColumn({unique: true})
    name: string;

    @OneToMany(() => SongCollabRequest, SongCollabRequest => SongCollabRequest.status)
    requests?: SongCollabRequest[];
}