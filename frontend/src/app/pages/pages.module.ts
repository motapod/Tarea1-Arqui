import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { Loader } from './loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    Loader
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class PagesModule {}
