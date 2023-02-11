import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Movie} from '../models/movie';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://127.0.0.1:3000/movies';

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.url)
      .pipe(tap(data => console.log(data)));
  }

  getSortedMoviesAsHttpResponse(): Observable<HttpResponse<Movie[]>> {
    const myParams = new HttpParams().set('_sort', 'title').set('_order', 'desc');
    return this.http
      .get<HttpResponse<Movie[]>>(this.url, {observe: 'response', params: myParams})
      .pipe(tap(console.log),
        catchError(this.handleError));
  }

  postMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post(this.url, movie)
      .pipe(tap(console.log),
        catchError(this.handleError));
  }

  putMovie(movie: Movie): Observable<Movie> {
    return this.http
      .put(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log),
        catchError(this.handleError));
  }

  patchMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http
      .patch(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log),
        catchError(this.handleError));
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(tap(console.log),
        catchError(this.handleError));
  }

  headers(): Observable<HttpHeaders> {
    const addHeaders = new HttpHeaders({
      Autorizations: 'token',
      'Content-Type': 'application/json'
    })
    return this.http
      .get<Movie[]>(this.url, {observe: 'response', headers: addHeaders})
      .pipe(
        tap((res: HttpResponse<Movie[]>) => { console.log(res.headers.keys()); console.log(res.headers.get('Content-Type'))}),
        map((res: HttpResponse<Movie[]>) => res.headers)
      )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(
      'Name: ' + error.name +
      '\nMessage: ' + error.message +
      '\nError code: ' + error.status
    );
    return throwError('Something went wrong :(');
  }
}
