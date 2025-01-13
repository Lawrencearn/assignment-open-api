import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get(':country')
    getTopHeadlines(@Param('country') country: string) {
        return this.newsService.getTopHeadlines(country);
    }
} 