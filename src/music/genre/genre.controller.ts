import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Genre } from './Genre.entity';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './createGenre.dto';

@Controller('/api')
export class GenreController {
    constructor(private readonly GenreService: GenreService) {}

    // @Get('/:id')
    // async findById(@Param("id") id: number): Promise<Genre> {
    // }

    @Post('/create-genre')
    async create(@Body() genreData: CreateGenreDto): Promise<Genre | undefined> {
        return await this.GenreService.create(genreData);
    } 

}
