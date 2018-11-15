import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { TopicService } from '../topic.service';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var jQuery: any;

@Component({
  selector: 'app-topic-modal',
  templateUrl: './topic-modal.component.html',
  styleUrls: ['./topic-modal.component.scss']
})
export class TopicModalComponent implements OnInit {
  topicForm: FormGroup;
  topic = {'title': '', 'description': ''};
  validInputs = {'title': false, 'description': false};
  checkValid = false;
  btnEnable = {
      'active': this.validInputs.title && this.validInputs.description,
  };
  waitingResponse = false;
  constructor(private topicService: TopicService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.addjQueryTooltip();
  }

  submitNewTopic($event) {
    this.waitingResponse = true;
    this.topicService.createTopic(this.topic.title, this.topic.description).subscribe(
      topic => {
        this.showMessage(`Topic creado: ${topic.title}`, 'success');
        this.waitingResponse = false;
        this.topic = {'title': '', 'description': ''};
        this.topicService.addTopicToCastTopics(topic);
        jQuery('#topicModal').hide();
      },
      err => {
        this.showMessage('Error creando topic. Intente nuevamente', 'danger');
        this.waitingResponse = false;
      }
    );
  }

  validateInput() {
    this.validInputs.title = this.topic.title.length > 4 ? true : false;
    this.validInputs.description = this.topic.description.length > 4 ? true : false;
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: 5000,
      showCloseBtn: true,
      closeOnClick: true
    });
  }
}
