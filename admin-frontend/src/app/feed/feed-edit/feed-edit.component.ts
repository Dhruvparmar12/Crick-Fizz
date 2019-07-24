import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed-edit',
  templateUrl: './feed-edit.component.html',
  styleUrls: ['./feed-edit.component.css']
})
export class FeedEditComponent implements OnInit {
  id;
  updateForm= new FormGroup({
    feed_title: new FormControl(null,Validators.required),
    feed_desc:new FormControl(null,Validators.required)
  })
  constructor(private feed:FeedService,private route:Router, private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(id=>{

      

      })
    }
  onUpdate(){

    this.feed.updatefeed(this.updateForm.value,this.id).subscribe(data=>{
      if(data){
        alert('data updated')
        this.route.navigate(['/feed'])
      }
      else{
        alert('not Updated')
      }
     })

    }
}

