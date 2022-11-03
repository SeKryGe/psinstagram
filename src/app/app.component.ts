import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable, pluck } from 'rxjs';




export interface AnimalResponse {
  message: {
    [race: string]: [vers: string]
  }
  status: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: any = []

  constructor (
    private http: HttpClient
     ) {}

  ngOnInit() {
    this.getResponse().subscribe (animals => {
      console.log(Object.values(animals.message).flat())
      this.todos = animals
      })
  }

  getResponse() {
    return this.http.get<AnimalResponse>('https://dog.ceo/api/breeds/list/all', { responseType: 'json'})

    // .pipe(
    //   map(obj => [...Object.values(obj)]))

  }
}
