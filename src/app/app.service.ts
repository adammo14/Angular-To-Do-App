import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class MyService {
    private baseURL: string = "https://todo-app-adam2k21.herokuapp.com";

    constructor(private http: HttpClient) {}

    getToDos() {
        return this.http.get(`${this.baseURL}/api/todo`);
    }
}
