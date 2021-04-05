import { Component } from '@angular/core';
import { MyService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'phoebus-to-do-app';
    todos:any;

    constructor(private myService: MyService){

    }

    ngOnInit() {
        this.myService.getToDos().subscribe(data => this.todos = data)
    }
}