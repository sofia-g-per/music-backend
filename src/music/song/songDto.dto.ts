import { AutoMap } from '@automapper/classes';
import { Exclude, Expose } from 'class-transformer';
import { ArtistDto } from '../artist/artistDto.dto';
import { ArtistsToSongs } from '../artist/artistsToSongs.entity';
import { GenreDto } from '../genre/genreDto.dto';

@Exclude()
export class SongDto {  

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    name: string; 

    @AutoMap()
    @Expose()
    released_at: Date;

    @AutoMap()
    @Expose()
    description?: string;

    @AutoMap()
    @Expose()
    lyrics?: string;
    
    @AutoMap()
    @Expose()
    artists: [ArtistsToSongs];

    @AutoMap(()=>[GenreDto])
    @Expose()
    genres?: GenreDto[];

    @AutoMap()
    @Expose()
    coverImg?: string;

    @AutoMap()
    @Expose()
    filePath: string;

}