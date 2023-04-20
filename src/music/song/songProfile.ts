import { ArtistAsAuthor } from './../artist/ArtistAsAuthor.dto';
import { ArtistsToSongs } from './../artist/artistsToSongs.entity';
import { AddExistingArtistDto } from './../artist/addExistingArtistDto.dto';
import { createMap, forMember, mapFrom, namingConventions, SnakeCaseNamingConvention, CamelCaseNamingConvention, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile } from '@automapper/core';
import { Song } from './song.entity';
import { SongDto } from './songDto.dto';
import { CreateSongDto } from './createSong.dto';
import { generatedPlaylist } from '../playlist/generatedPlaylist.entity';
import { NameDto } from './name.dto';
import { ContentStatus } from './contentStatus.entity';
@Injectable()
export class SongProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {

      createMap(mapper, AddExistingArtistDto, ArtistsToSongs);

      // entity -> dto
      createMap(mapper, Song, SongDto, 
        // forMember(dto=> dto.artists, mapWith(ArtistsToSongs, ArtistAsAuthor , entity =>  entity.artists))
        )

      // creating -> entity
      createMap(mapper, CreateSongDto, Song,
        forMember(entity => entity.genres, 
          // condition((createDto) => {return createDto.genreIds && createDto.genreIds.length > 0}),
          mapFrom((createDto) => {
            const existingGenres = [];
            if(createDto.genreIds){
              for (let i = 0; i < createDto.genreIds.length; i++)  {
                existingGenres.push({id: createDto.genreIds[i]});
              }
            }
            if(createDto.genres){
              return existingGenres.concat(createDto.genres);
            }
            return existingGenres;
        })),
        forMember(entity => entity.status,
          mapFrom(dto => {return {name: dto.status}})
          ),
      //   forMember(
      //     (destination) => destination.artists,
      //     mapWith(AddExistingArtistDto, ArtistsToSongs, (source) => source.artists)
      // )
      );

      createMap(mapper, generatedPlaylist, SongDto, 
        namingConventions({
          source: new SnakeCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        }));
    };
  }
}


