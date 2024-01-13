// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// forms
import { FormsModule } from '@angular/forms';

// services
import { SharedDataService } from '../internal-services/shared-data.service';
import { ContestNewService } from '../http-services/contest-new.service';

// interfaces
import { ContestObjectiveSchema } from '../interfaces/contest-objective-schema';
import { ContestNewRequest } from '../interfaces/contest-new-request';
import { ContestNewResponse } from '../interfaces/contest-new-response';


@Component({
  selector: 'app-contest-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contest-new.component.html',
  styleUrl: './contest-new.component.css'
})
export class ContestNewComponent {
  contestNewResponseBody: ContestNewResponse;

  userId: string;

  maxRoundValue: number;
  ratedValue: string;
  typeValue: string;

  objectives: ContestObjectiveSchema[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private contestNewService: ContestNewService
  ) {}

  ngOnInit() {

    // initialize values
    this.maxRoundValue = 0;
    this.ratedValue = "true";
    this.typeValue = "Standard";
    this.addObjective();

    // get userId
    this.sharedDataService.getCookieUserId().subscribe(userId => {
      this.userId = userId;
    })
  }

  maxRoundLess() {
    if (this.maxRoundValue > 0) {
      this.maxRoundValue--
    }
  }

  maxRoundMore() {
    if (this.maxRoundValue < 10) {
      this.maxRoundValue++
    }
  }

  addObjective() {
    let objective: ContestObjectiveSchema = {
      name: "New Objective",
      value: 1
    }

    this.objectives.push(objective);
  }

  removeObjective(index: number) {
    if (this.objectives.length > 1) {
      this.objectives.splice(index, 1);
    }
  }

  objectiveLess(index: number) {
    if (this.objectives[index].value > 1) {
      this.objectives[index].value--
    }
  }

  objectiveMore(index: number) {
    if (this.objectives[index].value < 10) {
      this.objectives[index].value++
    }
  }

  createContest() {

    // prepare request
    let contestNewRequest: ContestNewRequest = {
      authorId: this.userId,
      maxRoundCount: this.maxRoundValue,
      rated: this.ratedValue === "true",
      type: this.typeValue,
      objectives: this.objectives
    }

    this.contestNewService.createContest(contestNewRequest).subscribe(
      (contestNewResponse) => {
        this.contestNewResponseBody = contestNewResponse.body!;
      },
      (error) => {}
    )
  }
}
