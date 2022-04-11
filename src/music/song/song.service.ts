import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { GenreService } from '../genre/genre.service';
import { CreateSongDto } from './createSong.dto';
import { SongsRepository } from './song.repository';
import { ArtistService } from '../artist/artist.service';
import { ArtistsToSongsRepository } from '../artist/artistsToSongs.repository';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
        @InjectRepository(ArtistsToSongsRepository) private artistsToSongsRepository: ArtistsToSongsRepository,
        private genreService: GenreService,
        private artistService: ArtistService
    ) {}
    
    async create(user: User, songData: CreateSongDto, files) {
        let song = instanceToPlain(songData);

        //прикреление артистов
        song.artists = []
        let artists = await this.artistService.addExistingArtists(songData, song);
        if(artists){
            song.artists = artists;
        }
        song.artists.push(user);

        //прикреление аудиофайла
        song.file_path = files.audioFile[0]['filename'];

        //прикрепление обложки песни
        if(files.cover){
            song.cover_img = files.cover[0].filename;
        }

        //прикрепление жанров
        if(!song.genres){
            song.genres = [];
        }
        song.genres = await this.genreService.addExistingGenres(songData, song);
        song.genres = await this.genreService.addExistingGenres(songData, song);

        
        const newSong = await this.songsRepository.customSave(song);
        let artistsToSongs;
        if(newSong){
            artistsToSongs = await this.artistsToSongsRepository.saveMultipleArtists(song.artists, newSong);
        }
        return newSong;
    }
}

