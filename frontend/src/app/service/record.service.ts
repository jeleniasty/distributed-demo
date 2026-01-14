import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap} from 'rxjs';
import {RecordModel} from '../model/record.model';
import {HttpClient} from '@angular/common/http';
import {RecordDetailsModel} from '../model/record-details.model';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private API_URL = `${environment.apiUrl}/records`;
  private refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  getRecords(page: number, size: number): Observable<RecordModel[]> {
    return this.http.get<{ content: RecordModel[] }>(
      `${this.API_URL}?page=${page}&size=${size}&sort=id,desc`
    ).pipe(map((response: any) => response.content));
  }

  add(record: Partial<RecordModel>) {
    return this.http.post<RecordModel>(this.API_URL, record).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  getById(id: number): Observable<RecordDetailsModel> {
    return this.http.get<RecordDetailsModel>(`${this.API_URL}/${id}`)
  }
}
