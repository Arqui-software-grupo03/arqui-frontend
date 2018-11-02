import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  inputText: string;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.inputText = '';
  }
  onChangeInput(event) {
    this.inputText = event.target.value;
  }

  onSubmit(event) {
    this.postsService.createNewPost(this.inputText).subscribe(response => {
      console.log(response);
      console.log(this.inputText);
    }, error => {
      console.log(error);
      console.log("error");
    });

  }
  onKeyDown(event) {
    this.onChangeInput(event);
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }

}
