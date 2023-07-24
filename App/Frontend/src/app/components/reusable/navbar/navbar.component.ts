import {Component, Input, OnInit} from '@angular/core';
import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() selected: number = 0;

  readonly nav_items: string[][] = [
    ["Mes serveurs", "/dashboard"],
    ["Mes factures", "/factures"],
    ["Louer un serveur", "/louer"],
  ];

  isCollapsed: boolean = true;

  constructor(
    private authenticatorService: AuthenticatorService
  ) { }

  ngOnInit(): void {
  }

  disconnect(): void {
    this.authenticatorService.disconnect();
  }
}
