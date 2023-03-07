import { generatedPlaylist } from './generatedPlaylist.entity';
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap, forMember } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Playlist } from "./playlist.entity";
import { PlaylistDto } from "./playlistDto.dto";
import { CreatePlaylistDto } from "./createPlaylistDto.dto";
import { SongDto } from '../song/songDto.dto';

@Injectable()
export class PlaylistProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // entity -> dto
      createMap(mapper, Playlist, PlaylistDto)
    };
  }
}

