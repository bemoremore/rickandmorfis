import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from './services/flowbite-service.service';
import { RickAndMortyService } from './services/rickandmorty.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private flowbiteService: FlowbiteService,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded:', flowbite);
    });

    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.characters = [];
    this.rickAndMortyService
      .getCharacters(this.currentPage, this.searchQuery)
      .subscribe({
        next: (data: any) => {

          this.characters = data.results; 
          this.totalPages = data.info.pages;
        },
        error: (err: any) => {
          console.error('Error fetching characters:', err);
        },
      });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement; 
    this.searchQuery = input.value;
    this.currentPage = 1;
    this.fetchCharacters();
  }

  changePage(next: boolean): void {
    if (next && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (!next && this.currentPage > 1) {
      this.currentPage--;
    }
    this.fetchCharacters();
  }

}


  
