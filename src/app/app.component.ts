import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MyService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'phoebus-to-do-app';
    myGroup: FormGroup;
    newTodo: string = '';
    todoObj: any;
    todos: any;
    yo: any;

    constructor(
        public myService: MyService
    ){
        this.myGroup = new FormGroup({
            newTodo: new FormControl()
        });
    }

    ngOnInit() {
        this.getAllTodos();
    }

    getAllTodos() {
        this.myService.getToDo().subscribe(res => {
            console.log('get All done!');
            this.yo = res;
            this.todos = this.yo.data;
        });
    }

    addNewItem(event: Event) {
        this.todoObj = {
            id: 0 + this.todos.length + 1,
            title: this.myGroup.controls.newTodo.value,
            isDone: false,
            editing: false
        }
        this.myService.addToDo(this.todoObj).subscribe(() => {
            console.log('post one done!');
            this.myGroup.controls.newTodo.setValue('');
            event.preventDefault();
            this.getAllTodos();
        });
    }

    updateTitle(event: Event, userId: String, title: String) {
        this.myService.updateTitle(userId, title).subscribe(() => {
            console.log('update title done!');
            this.getAllTodos();
        });
    }

    toggleIsDone(event: Event, userId: String, isDone: Boolean) {
        isDone = !isDone;
        this.myService.toggleIsDone(userId, isDone).subscribe(() => {
            console.log('toggle isDone done!');
            this.getAllTodos();
        });
    }

    deleteToDo(userId: String) {
        this.myService.deleteToDo(userId);
        this.getAllTodos();
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }
}
