import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transferData } from '../models/transferData.model';

const baseUrl = `http://localhost:4200/api/transfers`;

@Injectable({ providedIn: 'root' })
export class TransferService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<transferData[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<transferData>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
