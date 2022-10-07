import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransferItem } from './models';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'content-Type': 'application/json' }),
};

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getTransfers(): Observable<TransferItem[]> {
    return this.http.get<TransferItem[]>(
      `${environment.baseUrl}/transfer`,
      httpOptions
    );
  }

  addTransfer(data: TransferItem): Observable<TransferItem> {
    return this.http.post<TransferItem>(
      `${environment.baseUrl}/transfer`,
      data
    );
  }

  updateTransfer(data: TransferItem): Observable<TransferItem> {
    return this.http.put<TransferItem>(
      `${environment.baseUrl}/transfer/${data.id}`,
      data
    );
  }

  deleteTransfer(id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    const requestOptions: object = { headers, responseType: 'text' };
    return this.http.delete<any>(
      `${environment.baseUrl}/transfer/${id}`,
      requestOptions
    );
  }
}
