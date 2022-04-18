import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './createGenre.dto';

@Controller('/api')
export class GenreController {
    constructor(private readonly GenreService: GenreService) {}

    @Get('/genres')
    async getAll(): Promise<Genre[]> {
        return await this.GenreService.getAll();
    }

    @Post('/create-genre')
    async create(@Body() genreData: CreateGenreDto): Promise<Genre | undefined> {
        return await this.GenreService.create(genreData);
    } 

}
