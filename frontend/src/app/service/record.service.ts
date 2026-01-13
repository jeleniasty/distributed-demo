import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {RecordModel} from '../model/record.model';
import {HttpClient} from '@angular/common/http';
import {RecordDetailsModel} from '../model/record-details.model';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private API_URL = `${environment.apiUrl}/records`;

  private recordsSubject = new BehaviorSubject<RecordModel[]>([]);
  records$ = this.recordsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getRecords(page: number, size: number): Observable<RecordModel[]> {
    return this.http.get<{ content: RecordModel[] }>(
      `${this.API_URL}?page=${page}&size=${size}&sort=id,desc`
    ).pipe(
      map((response: any) => response.content),
      tap(records => {
        const current = page === 0 ? [] : this.recordsSubject.value;
        this.recordsSubject.next([...current, ...records]);
      })
    );
  }

  add(record: Partial<RecordModel>) {
    return this.http.post<RecordModel>(this.API_URL, record).pipe(
      tap(newRecord => {
        const currentRecords = this.recordsSubject.value;
        this.recordsSubject.next([newRecord, ...currentRecords]);
      })
    );
  }

  getById(id: number): Observable<RecordDetailsModel> {
    return this.http.get<RecordDetailsModel>(`${this.API_URL}/${id}`)
  }
}
