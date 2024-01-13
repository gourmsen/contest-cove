// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../../environments/environment';

// web-sockets
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocketSubject<string>;

  constructor() {
    this.socket = webSocket(environment.socket);
  }

  connect() {
    return this.socket.asObservable();
  }
}
