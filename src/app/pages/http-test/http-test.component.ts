import {Component} from '@angular/core';
import {HttpMoviesService} from '../../services/http-movies.service';
import {Movie} from '../../models/movie';
import {subscribeOn} from 'rxjs/operators';
import {error} from 'protractor';
import {Observable} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css']
})
export class HttpTestComponent {

  errorMessage: string;

  constructor(private http: HttpMoviesService) {
  }

  get() {
    this.http.getSortedMoviesAsHttpResponse().subscribe( { error: (err: string) => this.errorMessage = err} );
  }

  post() {
    const movie: Movie = {
      category: 'Fantasy',
      country: 'Poland',
      director: 'Marek Brodzki',
      imdbRating: '10.0',
      plot: 'Historia wiedźmina',
      poster: null,
      title: 'Wiedźmin',
      year: '2001'
    }
    this.http.postMovie(movie).subscribe( { error: (err: string) => this.errorMessage = err} );
  }

  put() {
    const movie: Movie = {
      id: '54',
      category: 'Fantasy',
      country: 'Poland',
      director: 'Marek Brodzki',
      imdbRating: '9.8',
      plot: '',
      poster: null,
      title: 'Wiedźmin',
      year: '2001'
    }
    this.http.putMovie(movie).subscribe( { error: (err: string) => this.errorMessage = err} );
  }

  patch() {
    const movie: Partial<Movie> = {
      id: '54',
      plot: 'Historia wiedźmina Geralda'
    }
    this.http.patchMovie(movie).subscribe( { error: (err: string) => { this.showError(err) }} );

  }

  delete() {
    this.http.deleteMovie(54)
      .subscribe( { error: (err: string) => { this.showError(err) }} );
  }

  headers() {
    return this.http.headers().subscribe();
  }

  private showError(err: string) {
    this.errorMessage = err
    setTimeout(() => {
      this.errorMessage = '';
    }, 1000)

  }
}
