import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// services
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  name: string;

  constructor (private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.getCookieName().subscribe(name => {
      this.name = name;
    });
  }
}
