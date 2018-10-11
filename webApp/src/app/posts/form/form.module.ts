import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@app/posts/form/form.component';
import { FormService } from './form.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormComponent
  ],
  providers: [
    FormService,
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
