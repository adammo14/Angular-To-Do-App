import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class MyService {
    private baseURL: string = "https://todo-app-adam2k21.herokuapp.com";
    //private baseURL: string = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    // GET all todos
    getToDo() {
        console.log('get All started')
        return this.http.get(`${this.baseURL}/api/todo`);
    }

    // POST a todo
    addToDo(newItem: Object) {
        console.log('post one started')
        return this.http.post(`${this.baseURL}/api/todo`, newItem);
    }

    // PUT
    updateTitle(id: String, title: String) {
        console.log('update title started')
        return this.http.put(`${this.baseURL}/api/todo/${id}`, {title: title})
    }

    // PUT
    toggleIsDone(id: String, isDone: Boolean) {
        console.log('toggle isDone started')
        return this.http.put(`${this.baseURL}/api/todo/isDone/${id}`, {isDone: isDone});
    }

    // DELETE a todo
    deleteToDo(id: String) {
        console.log('delete started')
        return this.http.delete(`${this.baseURL}/api/todo/${id}`).subscribe(data => {
            console.log('delete done!')
        });
    }
}
