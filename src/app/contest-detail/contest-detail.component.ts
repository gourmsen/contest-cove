// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { ActivatedRoute } from '@angular/router';

// services
import { ContestDetailService } from '../contest-detail.service';

// interfaces
import { ContestDetailResponse } from '../contest-detail-response';

@Component({
  selector: 'app-contest-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contest-detail.component.html',
  styleUrl: './contest-detail.component.css'
})
export class ContestDetailComponent {
  contestDetailResponseBody: ContestDetailResponse;

  contestId: string;

  constructor(
    private route: ActivatedRoute,
    private contestDetailService: ContestDetailService
  ) {}

  ngOnInit() {
    this.contestId = this.route.snapshot.paramMap.get("contestId") || "";

    this.contestDetailService.viewContest(this.contestId)
      .subscribe(
        (ContestDetailResponse) => {
          this.contestDetailResponseBody = ContestDetailResponse.body!;

          this.contestDetailResponseBody.data.creationDate = this.contestDetailResponseBody.data.creationDate.substring(0, 10);
        },
        (error) => {

        }
      );
  }
}
