import { Injectable } from '@angular/core';
import {Label} from "ng2-charts";
import {ChartDataSets} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class MockServerMonitoringService {

  constructor() { }

  /**
   * Retourne une échelle qui commence à l'heure pleine la plus proche (à l'inférieur) de date_actuelle - [hours_delay]heures et avance de 5min en 5min
   * @param hours_delay
   */
  constructLabels(hours_delay: number):Label[] {
    const labels: Label[] = [];
    const now = new Date();
    const start_date = new Date();
    start_date.setHours(start_date.getHours() - hours_delay);
    start_date.setMinutes(0, 0);
    while (start_date < now){
      labels.push(start_date.toLocaleString())
      start_date.setMinutes(start_date.getMinutes() + 5); // On incrémente de 5min en 5min
    }
    return labels
  }

  /**
   * Retourne une courbe à peu près continue composée de [data_points] points compris entre 4 et 99
   * @param data_points
   * @param label
   */
  constructData(data_points: number, label: string): ChartDataSets[]{
    const data: number[] = [];
    let current_use = Math.random() * 100;
    for(let i = 0; i < data_points; i++){
      data.push(Math.round(current_use*100) / 100);
      current_use = Math.min(Math.max(current_use + (Math.random() * 10 - 5), 4), 99); // On fait augmenter ou baisser l'utilisation CPU d'entre -5 et +5 pour avoir une courbe fluide, avec un minimum de 4% et un maximum de 99%
    }
    return [{data, label}]
  }
}
