import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { MapComponent } from './map/map.component';
import { SimpleesrimapComponent } from './simpleesrimap/simpleesrimap.component';
import { FeaturelayeresriComponent } from './featurelayeresri/featurelayeresri.component';
import { LeafletmapComponent } from './leafletmap/leafletmap.component';
import { HelpComponent } from './help/help.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'simpleesrimap', component: SimpleesrimapComponent },
  { path: 'featurelayer', component: FeaturelayeresriComponent },
  { path: 'leafletmap', component: LeafletmapComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: '/leafletmap', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
