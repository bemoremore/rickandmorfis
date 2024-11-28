import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickandmortyData } from '../interfaces/rickandmorty-data';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number, name: string): Observable<RickandmortyData> {
    const url = `${this.apiUrl}?page=${page}&name=${name}`;
    return this.http.get<RickandmortyData>(url);
  }
}
