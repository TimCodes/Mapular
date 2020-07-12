import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { MapComponent } from './map/map.component';
import { SimpleesrimapComponent } from './simpleesrimap/simpleesrimap.component';
import { HelpComponent } from './help/help.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'simpleesrimap', component: SimpleesrimapComponent },
  { path: 'map', component: MapComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
