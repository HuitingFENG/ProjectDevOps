import { Component, OnInit } from '@angular/core';

import {faLightbulb} from "@fortawesome/free-regular-svg-icons";
import {faMicrochip} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  faLightbulb = faLightbulb;
  faMicrochip = faMicrochip;

  constructor() { }

  ngOnInit(): void {
  }

}
