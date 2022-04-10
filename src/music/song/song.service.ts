import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { GenreService } from '../genre/genre.service';
import { CreateSongDto } from './createSong.dto';
import { SongsRepository } from './song.repository';
import { ArtistService } from '../artist/artist.service';
@Injectable()
export class SongService {
    constructor(@InjectRepository(SongsRepository) private songsRepository: SongsRepository,
    private genreService: GenreService,
    private artistService: ArtistService
    ) {}
    
    async create(user: User, songData: CreateSongDto) {
        let song = instanceToPlain(songData);
        if(!song.artists){
            song.artists = []
        }
        song.artists = await this.artistService.addExistingArtists(songData, song);
        song.artists.push(user);

        if(!song.genres){
            song.genres = [];
        }
        // прикрепление сущестувующих жанров
        song.genres = await this.genreService.addExistingGenres(songData, song);
        // прикрепление новых жанров
        song.genres = await this.genreService.addExistingGenres(songData, song);
        
        const newSong = await this.songsRepository.save(song);
        return newSong;
    }
}

