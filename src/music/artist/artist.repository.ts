import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository, getRepository, Not, Connection } from "typeorm";
import { AddExistingArtistDto } from "./addExistingArtistDto.dto";
import { Artist } from "./artist.entity";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { SongsRepository } from "../song/song.repository";
import { Song } from "../song/song.entity";
import { ListenedSong } from "../favourites/listenedSong.entity";
@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist>{
    constructor(@InjectConnection() private connection: Connection){
        super();
    }
    async findById(id: number){
        return await getRepository(Artist).findOne({where: { id: id }});
    }

    async getWithUserByArtistId(id: number){
        return await getRepository(Artist).findOne({
            relations: ["user"],
            where: { id: id }, 
        });
        
    }

    async findMultipleByIds(ids: number[]): Promise<Artist[]>{
        let artists: Artist[] = [];
          
        for (let id of ids) {
            const artist = await this.findById(id);
            
            if(artist instanceof Artist){
                artists.push(artist);
            }else{
                //return artist array
                throw new HttpException(
                    {
                        message:'Произошла ошибка при добавлении артиста'
                    }, 
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        return artists;
    }

    async addMultipleByIds(addArtistsData: AddExistingArtistDto[]): Promise<Artist[]>{
        let artists = [];
        for (let artistData of addArtistsData) {
            const artist = await this.findById(artistData.artistId);
            
            if(artist){
                artists.push({artist: artist, isFeatured: artistData.isFeatured});
            }else{
                //return artist array
                throw new HttpException(
                    {
                        message:'Произошла ошибка при добавлении артиста'
                    }, 
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        
        return artists;
    }

    async findAllExceptOne(excludeId: number): Promise<Artist[] | undefined>{
        return await getRepository(Artist).createQueryBuilder("Artist")
        .select()
        .where('"id" != :excludeId', {excludeId: excludeId})
        .andWhere('"user_id" IS NOT NULL').getMany();
    }

    async customSave(artistData){
        return await getRepository(Artist).save(artistData); 
    }

    async deleteById(artistId:number){
        return await getRepository(Artist).delete(artistId);
    }

    async getAllByArtist(artistId:number){
        // return await this.getAllByArtistQuery(artistId).select("*").orderBy("artistToUser.isFeatured", "ASC").getMany();
        return await this.getAllByArtistQuery(artistId).orderBy("artistToUser.isFeatured", "ASC").select().getMany();
    }

    public getAllByArtistQuery(artistId:number){
        return getRepository(Song)
        .createQueryBuilder("Song")
        .leftJoinAndSelect('Song.artists', 'artistToUser')
        .leftJoinAndSelect('artistToUser.artist', 'artist')
        .where('artist.id =:artistId', {artistId: artistId})
    }

    async getSongNumber(artistId: number){
        return await this.getAllByArtistQuery(artistId).getCount();
    }
    

    getListenedSongsByArtist(artistId:number){
        return getRepository(ListenedSong)
        .createQueryBuilder("listened")
        .leftJoinAndSelect('listened.song', 'song')
        .leftJoinAndSelect('song.artists', 'artistToUser')
        .leftJoinAndSelect('artistToUser.artist', 'artist')
        .where('artist.id =:artistId', {artistId: artistId})
    }

    async getSongsPlays(artistId:number){
        return await this.getListenedSongsByArtist(artistId)
        .select("song.id as song_id, COUNT(*) as plays")
        .groupBy('song.id')
        .orderBy("plays")
        .getRawMany();
    }


    async getTotalPlays(artistId:number){
        return await this.getListenedSongsByArtist(artistId)
        .getCount();
    }

    getPlaysPerPeriod(artistId:number, period: string){
        return this.getListenedSongsByArtist(artistId)
        .select('COUNT(*) as plays, DATE_TRUNC(\''+period+'\', "listen_date") as listen_date')
        .groupBy('DATE_TRUNC(\''+period+'\', "listen_date")')
    }

    getSongsPlaysPerPeriod(artistId:number, period:string){

        return this.getPlaysPerPeriod(artistId, period)        
            .addSelect('song.id as song_id, song.name')
            .addGroupBy('song.id, song.name');
    }
    
    async getAvgSongPlaysPerPeriod(artistId:number, period:string){
        const avgPlaysQB = this.getSongsPlaysPerPeriod(artistId, period);
        const qb = this.connection.createQueryBuilder()
        .select('AVG("plays") as plays_per_period')
            .from("(" + avgPlaysQB.getQuery() +")", "plays_with_days")
            .setParameters(avgPlaysQB.getParameters())
        .addSelect('song_id')
        .groupBy('song_id')
        .orderBy("plays_per_period");

        return await qb.getRawMany();

    }

    async getAvgPlaysPerPeriod(artistId:number, period:string){
        const qb = this.connection.createQueryBuilder();
        const avgPlaysQB = this.getPlaysPerPeriod(artistId, period);
        return await qb.select('AVG("plays") as avg_plays')
            .from("(" + avgPlaysQB.getQuery() +")", "plays_with_days")
            .setParameters(avgPlaysQB.getParameters())
            .getRawOne();
    }
}