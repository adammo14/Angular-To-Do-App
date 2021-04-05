import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()

export class MyService {
    private SERVER_URL: string = "http://localhost:7000/api";

    constructor(private http: HttpClient) {

    }

    getToDos() {
        return this.http.get(`${this.SERVER_URL}/todo`);
    }
}
