import {Component} from '@angular/core';
import {AddRecordComponent} from './add-record/add-record.component';
import {RecordListComponent} from './record-list/record-list.component';
import {ApiKeyComponent} from './api-key/api-key.component';
import {WebsocketService} from './service/websocket.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [ApiKeyComponent, AddRecordComponent, RecordListComponent, MatSnackBarModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  constructor(private wsService: WebsocketService) {
  }
}
