import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Artist } from '../artist/artist.entity';
import { ArtistDto } from '../artist/artistDto.dto';
import { Genre } from '../genre/genre.entity';

export class SongDto {  
    id: number;

    name: string; 

    released_at: Date;

    description?: string;

    lyrics?: string;
    
    artists: [
        {
            artist: ArtistDto,
            isFeatured: boolean
        }
    ];

    genres?: Genre[];

    coverImg?: string;

    filePath: string;

}