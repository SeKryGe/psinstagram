import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';




export interface Response {
  message: {
    inner: string[]
  },
  status: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  dogs: string[] = []
  img = ''
  race = ''



  constructor(
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.getResponse()
  }

  getResponse() {
    return this.http.get<Response>('https://dog.ceo/api/breeds/list/all', { responseType: 'json' })
      .subscribe(res => {

        for (const [breed, subbreed] of Object.entries(res.message)) {
          this.dogs.push(breed)
          for (let spec of subbreed) {
            this.dogs.push(breed + ' ' + subbreed)
          }
        }
      })
  }



  getDog($event: any) {
    this.race = $event.target.value
    return this.http.get<Response>(`https://dog.ceo/api/breed/${this.race}/images/random`)
      .subscribe(img => {
        this.img = Object.values(img)[0]
      })
  }


}
