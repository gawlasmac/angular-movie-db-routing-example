import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Movie} from '../../../models/movie';

@Component({
  selector: 'app-movie-in-years',
  templateUrl: './movie-in-years.component.html',
  styleUrls: ['./movie-in-years.component.css']
})
export class MovieInYearsComponent implements OnInit {

  movies: Observable<Movie[]>;

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movies = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.httpService.getMoviesFromYear(params.get('year')))
    )

  }

}
