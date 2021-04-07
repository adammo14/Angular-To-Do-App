import { Component } from '@angular/core';
import { MyService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'phoebus-to-do-app';

    newTodo: string;
    todos: any;
    todoObj: any;
    yo: any;

    constructor(private myService: MyService){

    }

    ngOnInit() {
        this.getAllTodos();
    }

    getAllTodos() {
        this.myService.getToDo().subscribe(res => {
            this.yo = res;
            this.todos = this.yo.data;
        });
    }

    addNewItem(event) {
        this.todoObj = {
            id: 0 + this.todos.length + 1,
            title: this.newTodo,
            isDone: false,
            editing: false
        }
        this.myService.addToDo(this.todoObj).subscribe(data => {
            console.log('todo added!', this.todoObj)
        });
        this.newTodo = '';
        event.preventDefault();
        this.getAllTodos();
    }

    updateTitle(event, userId, title) {
        this.myService.updateTitle(userId, title);
        this.getAllTodos();
    }

    toggleIsDone(event, userId, isDone) {
        isDone = !isDone;
        this.myService.toggleIsDone(userId, isDone);
        this.getAllTodos();
    }

    deleteToDo(id) {
        console.log('i ran delete!', id)
        this.myService.deleteToDo(id);
        this.getAllTodos();
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }
}
