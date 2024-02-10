import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import * as packageJSON from "../../../package.json";

// services
import { SharedDataService } from "../internal-services/shared-data.service";
import { SignOutService } from "../internal-services/sign-out.service";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
    name: string;
    version: string = packageJSON.version;

    constructor(
        private sharedDataService: SharedDataService,
        private signOutService: SignOutService
    ) {}

    ngOnInit() {
        this.sharedDataService.getCookieName().subscribe((name) => {
            this.name = name;
        });
    }

    signOut() {
        this.signOutService.signOut();
    }
}
