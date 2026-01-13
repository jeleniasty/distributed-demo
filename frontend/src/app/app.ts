import { Component } from '@angular/core';
import {AddRecordComponent} from './add-record/add-record.component';
import {RecordListComponent} from './record-list/record-list.component';
import {ApiKeyComponent} from './api-key/api-key.component';

@Component({
  selector: 'app-root',
  imports: [ ApiKeyComponent, AddRecordComponent, RecordListComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
}
