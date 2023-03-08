import { EntityRepository, Repository, getRepository } from "typeorm";
import { Song } from "./song.entity";
import { AddExistingSongsToCollectionDto } from "../playlist/addExistingSongsToCollection.dto";
import { CreateSongDto } from "./createSong.dto";

@EntityRepository(Song)
export class SongsRepository extends Repository<Song>{
    
    async findById(id: number, withArtist:boolean): Promise<Song>{
        let queryOptions: any = {
            where: {id: id}
        }
        if(withArtist){
            queryOptions.relations = ['artists'];
        }
        return await getRepository(Song).findOne(queryOptions);

    }

    async findMultipleByIds(ids: number[], withArtist:boolean): Promise<Song[]>{
        let songs: Song[] = [];
          
        for (let id of ids) {
            const song = await this.findById(id, withArtist);
            if(song instanceof Song){
                songs.push(song);
            }else{
                return undefined
            }
        }

        return songs;
    }

    async findAll(){
        return await getRepository(Song)
        .createQueryBuilder("Song")
        .select()
        .leftJoinAndSelect('Song.artists', 'artistToUser')
        .leftJoinAndSelect('artistToUser.artist', 'artist')
        .orderBy("artistToUser.isFeatured", "ASC")
        .getMany();
    }

    async getAllByArtist(artistId:number){
        return await getRepository(Song)
        .createQueryBuilder("Song")
        .select()
        .leftJoinAndSelect('Song.artists', 'artistToUser')
        .leftJoinAndSelect('artistToUser.artist', 'artist')
        .where('artist.id =:artistId', {artistId: artistId})
        .orderBy("artistToUser.isFeatured", "ASC")
        .getMany();
    }

    public async customSave(entity) {
        return await getRepository(Song).save(entity);
    }

    async deleteById(id:number){

       let response =  await getRepository(Song).delete(id);
       return response;
    }

    //добавление в плейлисты и альбомы
    async addMultipleByIds(addSongsData: AddExistingSongsToCollectionDto[], withArtist:boolean): Promise<Song[]>{
        let songs = [];

        for (let songData of addSongsData) {
            let song;

            //если песня существует (предоставлен id)
            if(!songData.song && songData.songId){
                song = await this.findById(songData.songId, withArtist);
            }else{
                song = this.customSave(songData.song);
            }

            if(song){
                songs.push({song: song, songIndex: songData.songIndex});
            }else{
                return undefined
            }
        }
        return songs;
    }

}