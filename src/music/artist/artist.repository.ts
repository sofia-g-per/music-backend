import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository, getRepository, Not } from "typeorm";
import { AddExistingArtistDto } from "./addExistingArtistDto.dto";
import { Artist } from "./artist.entity";

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist>{
    
    async findById(id: number){
        return await getRepository(Artist).findOne({where: { id: id }});
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
        return await getRepository(Artist).find({ id: Not(excludeId) });
    }

    async customSave(artistData){
        return await getRepository(Artist).save(artistData); 
    }
}