import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@app/posts/form/form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormComponent
  ],
  providers: [
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
