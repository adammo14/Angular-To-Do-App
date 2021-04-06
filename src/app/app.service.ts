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
    //

    // DELETE a todo
    deleteToDo(id: Number) {
        return this.http.delete(`${this.baseURL}/api/todo/${id}`);
    }
}
