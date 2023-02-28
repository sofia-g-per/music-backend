import { EntityRepository, Repository, getRepository, Brackets } from "typeorm";
import { FavoriteSong } from "./favoriteSong.entity";
import { getConnection } from "typeorm";
@EntityRepository(FavoriteSong)
export class FavoriteSongsRepository extends Repository<FavoriteSong>{
    
    async findById(id: number): Promise<FavoriteSong>{
        return await getRepository(FavoriteSong).findOne({where: { id: id }});
    }

    async findByUser(id: number): Promise<FavoriteSong[]>{
        return await getRepository(FavoriteSong).find({
            where: { userId: id },
            relations: ['song', 'song.artists']
        });
    }

    // async customDelete(songId, userId){
    //     console.log('repository', songId, userId)
    //     // return await getRepository(FavoriteSong).delete({songId: songId, userId: userId });
    //     return await getConnection()
    //     .createQueryBuilder()
    //     .delete()
    //     .from(UsersToSongs)
    //     .where('songId = :songId', {songId: songId})
    //     .andWhere('userId = :userId', {userId: userId})
    //     .execute();
    // }

    async findByQuery(userId: number, query: string){

        return await getRepository(FavoriteSong)
        .createQueryBuilder("FavoriteSong")
        .select()
        .where("FavoriteSong.userId = :id", { id: userId })
        .leftJoinAndSelect('FavoriteSong.song', 'song')
        .leftJoinAndSelect('song.artists', 'artists')
        .leftJoinAndSelect('artists.artist', 'artist')
        .andWhere(new Brackets(qb => {
            qb.where(`MATCH(song.name) AGAINST ('${query}' IN BOOLEAN MODE)`)
              .orWhere(`MATCH(artist.stagename) AGAINST ('${query}' IN BOOLEAN MODE)`)
        }))
        .getMany();
    }
}