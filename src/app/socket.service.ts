// basic service
import { Injectable } from '@angular/core';

// web-sockets
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocketSubject<string>;

  constructor() {
    this.socket = webSocket("ws://localhost:3000");
  }

  connect() {
    return this.socket.asObservable();
  }
}
