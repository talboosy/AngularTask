import { Component, ElementRef, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { Chart } from 'chart.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  canvas: any;
  ctx: any;
  chart: any;
  data: any;

  constructor(
    private chartService: ChartsService,
    private elementRef: ElementRef,
    private service: AuthService
  ) {}

  ngOnInit(): void {
    this.data = this.service.data;
    if(this.data){
      console.log(this.data[0].procedure)
      this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [
          this.data[1].timestamp,
          this.data[2].timestamp,
          this.data[3].timestamp
        ],
        datasets: [
          {
            label: 'Total cases.',
            data: [
              Number(this.data[1].value),
              Number(this.data[2].value),
              this.data[3].value
            ],
            borderWidth: 1,
          },
         
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: false,
      },
    });
    }
    
  }
}
