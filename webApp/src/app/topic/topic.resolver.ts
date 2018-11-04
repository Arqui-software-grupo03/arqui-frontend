import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TopicService } from './topic.service';


@Injectable({
    providedIn: 'root'
})
export class TopicPostsResolver implements Resolve<any> {
    constructor(private topicService: TopicService) {}
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.topicService.getTopicById(+route.params['topicId']);
    }
}
