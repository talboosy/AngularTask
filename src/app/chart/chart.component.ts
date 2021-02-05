import { Component, ElementRef, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  canvas: any;
  ctx: any;
  chart: any;

  constructor(
    private chartService: ChartsService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [
          'USA',
          'Spain',
          'Italy',
          'France',
          'Germany',
          'UK',
          'Turkey',
          'Iran',
          'China',
          'Russia',
          'Brazil',
          'Belgium',
          'Canada',
          'Netherlands',
          'Switzerland',
          'India',
          'Portugal',
          'Peru',
          'Ireland',
          'Sweden',
        ],
        datasets: [
          {
            label: 'Total cases.',
            data: [
              886789,
              213024,
              189973,
              158183,
              153129,
              138078,
              101790,
              87026,
              82804,
              62773,
              50036,
              42797,
              42110,
              35729,
              28496,
              23502,
              22353,
              20914,
              17607,
              16755,
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: false,
      },
    });
  }
}
