import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



export interface AnimalResponse {
  message: {
    [key: string]: []
  },
  status: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: string[] | undefined;

  constructor (
    private http: HttpClient
     ) {}

  ngOnInit() {
    this.getResponse()
  }

  getResponse() {
    return this.http.get<AnimalResponse>('https://dog.ceo/api/breeds/list/all', {responseType: 'json'})
      // .pipe(
      //   map(obj => [...Object.values(obj)]))
      .subscribe(animalResponse => {
        console.log(Object.entries(animalResponse.message));
        this.todos = Object.values(animalResponse.message).flat();
        // console.log(Object.values(animalResponse.message).flat());
      })
  }
}
