import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css']
})
export class ServerCardComponent implements OnInit {

  @Input() vcores: string = "";
  @Input() ram: string = "";
  @Input() os: string = "";
  @Input() disque: string = "";
  @Input() io: string = "";
  @Input() date_debut: Date = new Date();
  @Input() date_fin: Date | null = null;

  readonly logos: { [id: string]: string} = {
    CentOS : "CentOS_logo.png",
    Debian : "Debian_logo.png",
    Ubuntu : "Ubuntu_logo.png",
    Windows : "WindowsServer_logo.png",
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayEndDate(): string {
    if(this.date_fin){
      if (this.date_fin < new Date()){ // Si la date est dans le passé
        return ` - A expiré le ${this.date_fin.toLocaleDateString()}`;
      } else { // Si elle est dans le futur
        return ` - Expire le ${this.date_fin.toLocaleDateString()}`
      }
    } else {
      return "";
    }
  }

  searchLogo(): string {
    const prefix = this.os.split(" ")[0];
    const path = this.logos[prefix];

    if (path) {
      return 'assets/' + path;
    } else {
      return 'assets/default_logo.png';
    }

  }
}
