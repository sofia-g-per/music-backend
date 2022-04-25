import { EntityRepository, Repository, getRepository, Brackets } from "typeorm";
import { UsersToSongs } from "./usersToSongs.entity";
import { getConnection } from "typeorm";
@EntityRepository(UsersToSongs)
export class UsersToSongsRepository extends Repository<UsersToSongs>{
    
    async findById(id: number): Promise<UsersToSongs>{
        return await getRepository(UsersToSongs).findOne({where: { id: id }});
    }

    async findByUser(id: number): Promise<UsersToSongs[]>{
        return await getRepository(UsersToSongs).find({
            where: { userId: id },
            relations: ['song']
        });
    }

    // async customDelete(songId, userId){
    //     console.log('repository', songId, userId)
    //     // return await getRepository(UsersToSongs).delete({songId: songId, userId: userId });
    //     return await getConnection()
    //     .createQueryBuilder()
    //     .delete()
    //     .from(UsersToSongs)
    //     .where('songId = :songId', {songId: songId})
    //     .andWhere('userId = :userId', {userId: userId})
    //     .execute();
    // }

    async findByQuery(userId: number, query: string){

        return await getRepository(UsersToSongs)
        .createQueryBuilder("UsersToSongs")
        .select()
        .where("UsersToSongs.userId = :id", { id: userId })
        .leftJoinAndSelect('UsersToSongs.song', 'song')
        .leftJoinAndSelect('song.artists', 'artists')
        .leftJoinAndSelect('artists.artist', 'artist')
        .andWhere(new Brackets(qb => {
            qb.where(`MATCH(song.name) AGAINST ('${query}' IN BOOLEAN MODE)`)
              .orWhere(`MATCH(artist.stagename) AGAINST ('${query}' IN BOOLEAN MODE)`)
        }))
        .getMany();
    }
}