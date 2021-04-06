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

    constructor(private myService: MyService){

    }

    ngOnInit() {
        this.getAllTodos();
    }

    getAllTodos() {
        this.myService.getToDo().subscribe(data => this.todos = data);
    }

    addNewItem(event) {
        this.todoObj = {
            id: this.todos.results + 1,
            title: this.newTodo,
            isDone: false
        }
        this.myService.addToDo(this.todoObj).subscribe(data => {
            console.log('todo added!')
        });
        this.newTodo = '';
        event.preventDefault();
        this.getAllTodos();
    }

    updateToDo(id: Number) {
        console.log(id)
    }

    deleteToDo(id: Number) {

    }
}
