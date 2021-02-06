import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbMenuModule, NbInputModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ChartsService } from './charts.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbInputModule,
    FormsModule, 
    ReactiveFormsModule,
    NbCardModule,
    HttpClientModule,
    NbSelectModule
    // NbMenuModule.forRoot()
  ],
  providers: [ChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
