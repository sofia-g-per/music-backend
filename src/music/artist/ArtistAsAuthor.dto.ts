import { AutoMap } from "@automapper/classes";
import { Expose } from 'class-transformer';

export class ArtistAsAuthor{  
    @AutoMap()
    @Expose()
    artistId: number;

    @AutoMap()
    @Expose()
    artistStagename: string;

    @AutoMap()
    @Expose()
    artistDescription?: string;
    
    @AutoMap()
    isFeatured: boolean;
}