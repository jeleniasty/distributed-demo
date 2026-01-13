import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecordModel} from '../model/record.model';
import {RecordService} from '../service/record.service';
import {RecordDetailsModel} from '../model/record-details.model';
import {DatePipe} from '@angular/common';
import {finalize, take} from 'rxjs';

@Component({
  selector: 'app-record-list',
  imports: [
    DatePipe
  ],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss',
  standalone: true
})
export class RecordListComponent implements OnInit{
  records: RecordModel[] = [];
  selectedRecord: RecordDetailsModel | null = null;

  page = 0;
  size = 10;
  loading = false;
  allLoaded = false;
  loadingDetails = false;

  constructor(private recordService: RecordService,private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.recordService.records$.subscribe(data => {
      this.records = data;
    });

    this.loadRecords();
  }

  loadRecords() {
    if (this.loading || this.allLoaded) return;
    this.loading = true;

    this.recordService.getRecords(this.page, this.size).subscribe({
      next: (data) => {
        if (data.length === 0) this.allLoaded = true;
        this.records.push(...data); this.cdr.detectChanges();
        this.page++;
      },
      complete: () => (this.loading = false),
      error: () => (this.loading = false)
    });
  }

  showDetails(record: RecordModel) {
    if (this.loadingDetails) return;

    this.selectedRecord = null;
    this.loadingDetails = true;

    this.recordService.getById(record.id)
      .pipe(
        take(1),
        finalize(() => {
          this.loadingDetails = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (fullRecord: RecordDetailsModel) => {
          this.selectedRecord = fullRecord;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loadingDetails = false;
          this.cdr.detectChanges();
        }
      });
  }

  closeDetails() {
    this.selectedRecord = null;
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const threshold = 10;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + threshold;

    if (isAtBottom && !this.loading && !this.allLoaded) {
      this.loadRecords();
    }
  }
}
