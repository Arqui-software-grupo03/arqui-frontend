import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  inputText: string;
  constructor() { }

  ngOnInit() {
  }
  onChangeInput(event) {
    this.inputText = event.target.value;
  }

  onSubmit(event) {
    console.log(this.inputText);
  }
  onKeyDown(event) {
    this.onChangeInput(event);
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }

}
