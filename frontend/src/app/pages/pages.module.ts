import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { Loader } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    Loader
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
  ],
})
export class PagesModule {}
