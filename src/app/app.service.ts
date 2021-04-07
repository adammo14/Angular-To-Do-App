import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class MyService {
    private baseURL: string = "https://todo-app-adam2k21.herokuapp.com";
    //private baseURL: string = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    // GET all todos
    getToDo() {
        return this.http.get(`${this.baseURL}/api/todo`);
    }

    // POST a todo
    addToDo(newItem: Object) {
        return this.http.post(`${this.baseURL}/api/todo`, newItem);
    }

    // PUT
    updateTitle(id: String, title: String) {
        console.log('update service', id, title)
        return this.http.put(`${this.baseURL}/api/todo/${id}`, {title: title}).subscribe(data => {
            console.log('done!')
        });
    }

    // PUT
    toggleIsDone(id: String, isDone: Boolean) {
        return this.http.put(`${this.baseURL}/api/todo/isDone/${id}`, {isDone: isDone}).subscribe(data => {
            console.log('done!')
        });
    }

    // DELETE a todo
    deleteToDo(id) {
        return this.http.delete(`${this.baseURL}/api/todo/${id}`).subscribe(data => {
            console.log('done!')
        });
    }
}
