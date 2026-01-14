import { Component } from '@angular/core';
import {RecordService} from '../service/record.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-record',
  imports: [
    FormsModule
  ],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss',
  standalone: true
})
export class AddRecordComponent {
  description: string = '';

  constructor(private recordService: RecordService) {}

  addRecord() {
    if (this.description.trim()) {
      this.recordService.add({ description: this.description }).subscribe(() => {});
    }
  }
}
