import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class MyService {
    private baseURL: string = "http://testing-stuff-2k21.herokuapp.com";
    private localBaseURL: string = "http://localhost:7000";

    constructor(private http: HttpClient) {}

    getToDos() {
        return this.http.get(`${this.localBaseURL}/api/todo`);
    }
}
