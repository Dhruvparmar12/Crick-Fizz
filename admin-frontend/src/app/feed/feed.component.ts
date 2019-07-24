import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feeds=[];
  constructor(private feed:FeedService) { }

  ngOnInit() {
   this.getFeed()
  }

  getFeed(){
    this.feed.getfeed().subscribe(res=>{
      if(res){
        console.log(res)
        this.feeds=res

      }
    })
  }
  deletefeed(id){
    this.feed.deleteFeed(id).subscribe(res=>{
      if(res){
        alert('Feed Deleted')  
        this.getFeed()
      }
    })
  }

}
