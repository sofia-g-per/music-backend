import { ArtistsToSongsRepository } from './artistsToSongs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import { GenresRepository } from '../genre/genre.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { ArtistStats } from './artistStats.dto';
import { SongStatsDto } from './songStats.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        @InjectMapper() private readonly mapper: Mapper,
        ) {}

    async create(artistData: CreateArtistDto): Promise<Artist | undefined>{
        let artist = this.mapper.map(artistData, CreateArtistDto, Artist);

        return await this.artistsRepository.customSave(artist);
    }

    async findAllExceptCurrent(currentArtistId: number): Promise<Artist[] | undefined>{
        return await this.artistsRepository.findAllExceptOne(currentArtistId);
    }

    async delete(artistId: number){
        return await this.artistsRepository.deleteById(artistId);
    }

    async getSongs(artistId:number){
        return await this.artistsRepository.getAllByArtist(artistId);
    }

    async getStats(artist: Artist){
        const stats = new ArtistStats();
        let res;
        stats.songNumber = await this.artistsRepository.getSongNumber(artist.id);
        stats.totalPlays = await this.artistsRepository.getTotalPlays(artist.id);
        res = await this.artistsRepository.getAvgPlaysPerPeriod(artist.id, 'day');
        stats.avgPlaysPerDay = res.avg_plays;
        res = await this.artistsRepository.getAvgPlaysPerPeriod(artist.id, 'month');
        stats.avgPlaysPerMonth = res.avg_plays;
        
        stats.playsPerDay = await this.artistsRepository.getPlaysPerPeriod(artist.id, 'day').getRawMany();
        stats.playsPerMonth = await this.artistsRepository.getPlaysPerPeriod(artist.id, 'month').getRawMany();
       
        stats.songStats = await this.formSongStats(artist.id);
        stats.songPlaysPerDay = await this.artistsRepository.getSongsPlaysPerPeriod(artist.id, 'day').getRawMany();
        stats.songPlaysPerMonth = await this.artistsRepository.getSongsPlaysPerPeriod(artist.id, 'month').getRawMany();

        return stats;
    }

    async formSongStats(artistId: number){
        const songs = await this.artistsRepository.getAllByArtist(artistId);
        const songPlays = await this.artistsRepository.getSongsPlays(artistId);
        const avgSongPlaysPerDay = await this.artistsRepository.getAvgSongPlaysPerPeriod(artistId, 'day');
        const avgSongPlaysPerMonth = await this.artistsRepository.getAvgSongPlaysPerPeriod(artistId, 'month');
        let index;
        const result = songs.map(song => {
            const res =  instanceToPlain(song);
            index = songPlays.findIndex(el => el.song_id == song.id);
            if(index !== -1){
                res.totalPlays = Number(songPlays[index].plays);
                songPlays.splice(index, 1);
            }else{
                res.totalPlays = 0;
            }

            index = avgSongPlaysPerDay.findIndex(el => el.song_id == song.id);
            if(index !== -1){
                res.avgPlaysPerDay = Number(avgSongPlaysPerDay[index].plays_per_period);
                avgSongPlaysPerDay.splice(index, 1);
            }else{
                res.avgPlaysPerDay = 0;
            }

            index = avgSongPlaysPerMonth.findIndex(el => el.song_id == song.id);
            if(index !== -1){
                res.avgPlaysPerMonth = Number(avgSongPlaysPerMonth[index].plays_per_period);
                avgSongPlaysPerMonth.splice(index, 1);
            }else{
                res.avgPlaysPerMonth = 0;
            }

            return res;
        });

        return result;

    }

    
    // СОЗДАНИЕ СВЯЗЕЙ (вызываются при создании других сущностей)
    // targetObject - объект который послужит для создания сущности  (ex. songData)
    // formData - объект с информацией от пользователя (ex. song)

    //прикрепление существующих артистов
    // async addExistingArtists(artistIds: AddExistingArtistDto[], targetObject){
    //     if(artistIds && artistIds.length > 0){
    //         let artists = await this.artistsRepository.addMultipleByIds(artistIds);
    //         return artistIds.concat(artistIds);
    //     }else{
    //         return artistIds;
    //     }
    // }

}
