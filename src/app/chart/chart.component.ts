import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../auth.service';
import * as _ from 'lodash';

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
  procedures: any;
  selectedProcedure: any;
  myChart: any;
  labels: any;
  values: any;

  constructor(
    private elementRef: ElementRef,
    private service: AuthService
  ) {}

  getProcedures(data: any) {
    this.procedures = [];
    for (var i = 0; i < data.length; i++) {
      if (this.procedures.indexOf(data[i].procedure) !== -1)
        continue
      else this.procedures.push(data[i].procedure);
    }
  }

  onApplyFilter(selectedProcedure: any) {
    var arr = _.filter(this.data, function(res){
      if(res.procedure == selectedProcedure) return res;
    })
    this.labels = this.extractLabels(arr)
    this.values = this.extractValues(arr)
    this.myChart.data.labels = this.labels
    this.myChart.data.datasets[0].data = this.values
    
    this.myChart.update()
  }

  extractLabels(array: any) {
    var labels:any = [];
    array.forEach(function(obj: { timestamp: any; }) {
      labels.push(obj.timestamp)
    })
    return labels;
  }

  extractValues(array: any){
    var values:any = [];
    array.forEach(function(obj: { value: any; }) {
      values.push(obj.value)
    })
    return values;
  }

  ngOnInit(): void {
    this.data = this.service.data;
    this.getProcedures(this.data)
    if (this.data) {
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: [
            this.data[1].timestamp,
            this.data[2].timestamp,
            this.data[3].timestamp,
          ],
          datasets: [
            {
              label: 'Total cases.',
              data: [
                Number(this.data[1].value),
                Number(this.data[2].value),
                this.data[3].value,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
}
