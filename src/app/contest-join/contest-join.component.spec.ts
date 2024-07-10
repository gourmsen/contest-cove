import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ContestJoinComponent } from "./contest-join.component";

describe("ContestJoinComponent", () => {
    let component: ContestJoinComponent;
    let fixture: ComponentFixture<ContestJoinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContestJoinComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContestJoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
