import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class NewsService {
    private readonly apiKey = '5806b6f8ce3546feb3c13151e25633fb'; // Replace with your API key
    private readonly apiUrl = 'https://newsapi.org/v2/top-headlines'; // Base URL for News API

    constructor(private httpService: HttpService) {}

    getTopHeadlines(country: string): Observable<any> {
        return this.httpService.get<AxiosResponse<any>>(this.apiUrl, {
            params: {
                country: country,
                apiKey: this.apiKey,
            },
        }).pipe(
            map(response => response.data), // Return the news data
            catchError(error => {
                console.error('Error fetching news:', error.response?.data || error.message);
                return throwError(() => new Error('Failed to fetch news'));
            }),
        );
    }
} 