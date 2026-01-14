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

  private page = 0;
  private size = 10;
  protected loading = false;
  private allLoaded = false;
  protected loadingDetails = false;
  private scrollTimeout: any;


  constructor(private recordService: RecordService,private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.recordService.refresh$.subscribe(() => {
      this.reloadList();
    });

    this.loadRecords();
  }

  reloadList() {
    this.records = [];
    this.page = 0;
    this.allLoaded = false;

    this.loadRecords();
  }

  loadRecords() {
    if (this.loading || this.allLoaded) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.recordService.getRecords(this.page, this.size).pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (newRecords: RecordModel[]) => {
        if (this.page === 0) {
          this.records = newRecords;
        } else {
          this.records.push(...newRecords);
        }
        this.page++;
        if (newRecords.length < this.size) {
          this.allLoaded = true;
        }
      },
      error: err => console.error('Records load error:', err)
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
    if (this.scrollTimeout || this.loading || this.allLoaded) return;

    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = null;
      const target = event.target as HTMLElement;
      const threshold = 100;
      const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + threshold;
      if (isAtBottom) {
        this.loadRecords();
      }
    }, 250);
  }
}
