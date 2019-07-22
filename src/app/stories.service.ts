import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {IStory} from './story';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://hacker-news.firebaseio.com/v0';
  }

  listBestStories() : Observable<any> {
    return this.http.get<IStory>(`${this.baseURL}/beststories.json`)
  }

  getStory(id) : Observable<any>{
    return this.http.get<IStory>(`${this.baseURL}/item/${id}.json`);
  }

  getBestStories() : Observable<any> {
    return this.listBestStories().pipe(
      mergeMap((ids) => forkJoin(ids.map((id) => this.getStory(id)))),
    )
  }
}
