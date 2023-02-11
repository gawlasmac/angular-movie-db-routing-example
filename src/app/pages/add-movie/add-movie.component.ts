import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/movie';
import {NgForm} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import * as http from 'http';
import {HttpMoviesService} from '../../services/http-movies.service';
import {error} from 'protractor';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  model: Partial<Movie> = {};
  categories: string[] = [];
  years: string[] = [];

  constructor(private httpService: HttpService, private httpMoviesService: HttpMoviesService) { }

  ngOnInit(): void {
    this.httpService.getCategories().subscribe(categories => this.categories = categories);
    this.httpService.getYears().subscribe(years => this.years = years);
  }

  send() {
    this.httpMoviesService.postMovie(this.model as Movie).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

}
