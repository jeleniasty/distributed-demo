import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { NotificationService } from './notification.service';
import { environment } from '../../environment';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private client: Client | null = null;
  private readonly RECORDS_COUNT_TOPIC = environment.recordsCountTopic;

  constructor(
    private notificationService: NotificationService,
    private apiKeyService: ApiKeyService
  ) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const apiKey = this.apiKeyService.getApiKey();
    if (!apiKey) {
      console.warn('API key missing, WebSocket not initialized');
      return;
    }

    this.client = new Client({
      brokerURL: `${environment.wsUrl}`,
      connectHeaders: { Authorization: `Bearer ${apiKey}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str: string) => console.debug('[STOMP]', str),
    });

    this.client.onConnect = (frame) => {
      console.log('STOMP connected:', frame);
      this.client?.subscribe(this.RECORDS_COUNT_TOPIC, (message: IMessage) => {
        const count = message.body;
        this.notificationService.show(`Current record count: ${count}`);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    };

    this.client.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
    };

    this.client.onDisconnect = () => {
      console.log('STOMP disconnected');
    };

    this.client.activate();
  }

  ngOnDestroy(): void {
    this.client?.deactivate();
    console.log('WebSocketService destroyed');
  }
}
