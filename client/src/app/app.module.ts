import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { SimpleesrimapComponent } from './simpleesrimap/simpleesrimap.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [AppComponent, MapComponent, HeroesComponent, HeroDetailComponent, MessagesComponent, SimpleesrimapComponent, HelpComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
