import { Exclude, Expose } from 'class-transformer';
import { ArtistDto } from '../artist/artistDto.dto';
import { GenreDto } from '../genre/genreDto.dto';

@Exclude()
export class SongDto {  

    @Expose()
    id: number;

    @Expose()
    name: string; 

    @Expose()
    released_at: Date;

    @Expose()
    description?: string;

    @Expose()
    lyrics?: string;
    
    @Expose()
    artists: [
        {
            artist: ArtistDto,
            isFeatured: boolean
        }
    ];

    @Expose()
    genres?: GenreDto[];

    @Expose()
    coverImg?: string;

    @Expose()
    filePath: string;

}