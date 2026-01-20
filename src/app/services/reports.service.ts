import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReportsService {
    httpClient: HttpClient = inject(HttpClient);
    constructor() { }

    getAIBasedFilters = (query: string) => {
        return this.httpClient.get(`https://cts-node-test.onrender.com/get-ai-based-filters?p=${query}`);
    }
}