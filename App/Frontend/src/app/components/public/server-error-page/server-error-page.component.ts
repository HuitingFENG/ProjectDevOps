import { Component, OnInit } from '@angular/core';
import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-server-error-page',
  templateUrl: './server-error-page.component.html',
  styleUrls: ['./server-error-page.component.css']
})
export class ServerErrorPageComponent implements OnInit {

  constructor(
    private authenticatorService: AuthenticatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticatorService.isConnected().subscribe((_) => {
      this.router.navigateByUrl('/');
    })
  }

}
