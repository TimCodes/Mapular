import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleesrimapComponent } from './simpleesrimap/simpleesrimap.component';
import { FeaturelayeresriComponent } from './featurelayeresri/featurelayeresri.component';
import { LeafletmapComponent } from './leafletmap/leafletmap.component';
import { HelpComponent } from './help/help.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: 'simpleesrimap', component: SimpleesrimapComponent },
  { path: 'home', component: LandingpageComponent },
  { path: 'featurelayer', component: FeaturelayeresriComponent },
  { path: 'leafletmap', component: LeafletmapComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
