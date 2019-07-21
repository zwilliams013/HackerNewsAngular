import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { IStory } from '../story'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: IStory[];
 
  constructor(private storiesService: StoriesService) { }

  getStoriesSearch (searchVal: string) {
    if (searchVal.length == 0) {
      this.storiesService.getBestStories()
      .subscribe
      (
        data => {
        this.stories = data;
      });
    }
    else {
      this.storiesService.getBestStories()
      .subscribe(
        data => {
        this.stories = data
          .filter(stories =>
            stories.title == searchVal.toLowerCase() ||
            stories.by == searchVal.toLowerCase()
          );
      });
    }
  }

  ngOnInit() {
    this.storiesService.getBestStories().subscribe((stories) => {
      this.stories = stories
    });
  }
}
