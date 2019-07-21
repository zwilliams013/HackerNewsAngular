import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: any[];

  constructor(private storiesService: StoriesService) { }

  getStoriesSearch(searchVal: string) {
    if (searchVal.length == 0) {
      this.storiesService.getBestStories().subscribe((stories) => {
        this.stories = stories
      });
    }
    else {
      this.storiesService.getBestStories().subscribe((stories) => {
        this.stories = stories
          .filter(stories =>
            stories.title.toString().toLowerCase() == searchVal.toLowerCase() ||
            stories.by.toString().toLowerCase() == searchVal.toLowerCase()
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
