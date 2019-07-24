import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-add',
  templateUrl: './feed-add.component.html',
  styleUrls: ['./feed-add.component.css']
})
export class FeedAddComponent implements OnInit {

  addFeed= new FormGroup({
    feed_title:new FormControl(null, Validators.required),
    feed_desc:new FormControl(null,Validators.required)
  })
  constructor(private feed:FeedService, private route:Router) { }

  ngOnInit() {
  }

  onAdd(){
      this.feed.addFeed(this.addFeed.value).subscribe(res=>{
        if(res){
          console.log(res)
          this.route.navigate(['/feed'])

        }
      })
  }
}
