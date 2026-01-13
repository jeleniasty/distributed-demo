import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiKeyService} from '../service/api-key.service';

@Component({
  selector: 'app-api-key',
  imports: [
    FormsModule
  ],
  templateUrl: './api-key.component.html',
  styleUrl: './api-key.component.scss',
  standalone: true
})
export class ApiKeyComponent {
  apiKey: string = '';

  constructor(private apiKeyService: ApiKeyService) {
    this.apiKey = this.apiKeyService.getApiKey() ?? '';
  }

  saveApiKey() {
    if (this.apiKey.trim()) {
      this.apiKeyService.setApiKey(this.apiKey);
    }
  }

}
