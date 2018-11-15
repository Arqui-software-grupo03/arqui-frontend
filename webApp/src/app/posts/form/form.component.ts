import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsersService } from '@app/users/users.service';
import { TopicService } from '@app/topic/topic.service';
import { ActivatedRoute } from '@angular/router';

const TIMEOUT = 5000;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  inputText: string;
  user;
  @Input() topicId: number;
  constructor(private usersService: UsersService, private flashMessages: FlashMessagesService,
              private postsService: PostsService, private topicService: TopicService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.inputText = '';
    this.usersService.castUser.subscribe(
      user => {
        this.user = user;
      }
    );
  }
  onChangeInput(event) {
    this.inputText = event.target.value;
  }

  async onSubmit(event) {
    const post = await this.postsService.createNewPost(this.inputText, this.user.id).toPromise().then()
      .catch( err => {
        this.showMessage('Hubo un problema al ingresar el post, intente nuevamente.', 'danger');
        console.log(`El problema al crear el post es: ${err}`);
      });
    if (post) {
      const topic = await this.topicService.addPostToTopic(this.topicId, post.id).toPromise().then()
      .catch( err => {
        this.showMessage('2 Hubo un problema al ingresar el post, intente nuevamente.', 'danger');
        console.log(err);
      });
      if (topic) {
        this.updateCastTopics(topic);
        this.updateCastTopicPosts(post);
        this.showMessage('¡Publicación creada correctamente!', 'success');
      } else {
        await this.postsService.deletePost(post.id).toPromise().then(
          msg => {} // console.log(msg)
        ).catch(
          err => {} // console.log(err)
        );
      }
    }
    this.inputText = '';
  }
  onKeyDown(event) {
    this.onChangeInput(event);
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }
  showMessage(message: string, type: string) {
    this.flashMessages.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  updateCastTopics(topic: any) {
    const allCastTopics = this.topicService.getAllTopicsFromCastValue();
    let idx;
    allCastTopics.map(
      (t, index) => {
        if (t.id === topic.id) {
          idx = index;
        }
      }
    );
    allCastTopics[idx] = topic;
    this.topicService.updateArrayCastTopics(allCastTopics);
  }
  updateCastTopicPosts(post: any) {
    this.postsService.addPostToCastTopicPosts(post);
  }
}
