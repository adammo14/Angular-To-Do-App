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
    newToDo: String;

    constructor(private myService: MyService){

    }

    ngOnInit() {
        this.myService.getToDo().subscribe(data => this.todos = data);
    }

    getToDo() {
        this.myService.getToDo().subscribe(data => this.todos = data);
    }

    addNewItem(newToDo: String) {
        console.log(`${newToDo} was added!`)
        const item = {
            id: this.todos.results + 1,
            title: newToDo
        }
        this.myService.addToDo(item).subscribe(data => this.todos = data);
    }
}
