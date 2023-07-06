import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home/home.component';
import { FlowersComponent } from './flowers/flowers.component';
import { FlowerListComponent } from './flowers/flower-list/flower-list.component';
import { FlowerDetailComponent } from './flowers/flower-detail/flower-detail.component';
import { FlowerItemComponent } from './flowers/flower-item/flower-item.component';
import { FlowerEditComponent } from './flowers/flower-edit/flower-edit.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowersFilterPipe } from './flowers/flowers-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FlowersComponent,
    FlowerListComponent,
    FlowerDetailComponent,
    FlowerItemComponent,
    FlowerEditComponent,
    DropdownDirective,
    FlowersFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
