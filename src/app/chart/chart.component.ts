import { Component, ElementRef, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
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
    private chartService: ChartsService,
    private elementRef: ElementRef,
    private service: AuthService
  ) {}

  getProcedures(data: any) {
    this.procedures = [];
    for (var i = 0; i < data.length; i++) {
      if (this.procedures.indexOf(data[i].procedure) !== -1)
        console.log('duplicate');
      else this.procedures.push(data[i].procedure);
    }
    console.log(this.procedures)
  }

  onApplyFilter(selectedProcedure: any) {
    console.log(selectedProcedure)
    var arr = _.filter(this.data, function(res){
      if(res.procedure == selectedProcedure) return res;
    })
    console.log(arr)
    this.labels = this.extractLabels(arr)
    this.values = this.extractValues(arr)
    this.myChart.data.labels = this.labels
    this.myChart.data.datasets[0].data = this.values
    
    console.log(this.labels)
    console.log(this.values)
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
      console.log(this.data[0].procedure);
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
