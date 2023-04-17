import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  searchTerm: string = '';

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }
}
