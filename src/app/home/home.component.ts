// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// services
import { SharedDataService } from '../internal-services/shared-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name: string;
  
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.getCookieName()
      .subscribe(name => {
        this.name = name;
      });
  }
}
