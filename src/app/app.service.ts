import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class MyService {
    private baseURL: string = "http://testing-stuff-2k21.herokuapp.com";

    constructor(private http: HttpClient) {}

    getToDos() {
        return this.http.get(`${this.baseURL}/api/todo`);
    }
}
