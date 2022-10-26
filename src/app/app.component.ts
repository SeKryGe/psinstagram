import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, pluck } from 'rxjs';



export interface Todo {
  message: {
    race: string[]
  },
  status: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []

  constructor (
    private http: HttpClient
     ) {}

  ngOnInit() {
    this.getResponse()
  }

  getResponse() {
    return this.http.get<Todo[]>('https://dog.ceo/api/breeds/list/all', { responseType: 'json'})
    .pipe(
      map(obj => [...Object.values(obj)]))
    .subscribe (todos => {
    console.log(todos)
    this.todos = todos
    })
  }
}
