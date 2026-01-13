import {ApiKeyService} from './service/api-key.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiKeyService: ApiKeyService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey: string | null = this.apiKeyService.getApiKey();

    if (!apiKey) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${apiKey}`
        )
      })
    );
  }
}
