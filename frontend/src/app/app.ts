import { Component, signal } from '@angular/core';
import {AddRecordComponent} from './add-record/add-record.component';
import {RecordListComponent} from './record-list/record-list.component';

@Component({
  selector: 'app-root',
  imports: [ AddRecordComponent, RecordListComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
}
