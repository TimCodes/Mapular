import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-featurelayeresri',
  templateUrl: './featurelayeresri.component.html',
  styleUrls: ['./featurelayeresri.component.css'],
})
export class FeaturelayeresriComponent implements OnInit {
  // Private vars with default values
  private _zoom = 9;
  private _center = [-118.805, 34.027];
  private _basemap = 'streets';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: any[]) {
    this._center = center;
  }

  get center(): any[] {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  @Output() mapLoaded = new EventEmitter<boolean>();

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() {}

  public ngOnInit() {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'])
      .then(([EsriMap, EsriMapView, FeatureLayer]) => {
        let map = new EsriMap({
          basemap: this._basemap,
        });

        let mapView = new EsriMapView({
          container: this.mapViewEl.nativeElement,
          center: this._center,
          zoom: this._zoom,
          map: map,
          popup: {
            autoOpenEnabled: false,
            dockEnabled: true,
            dockOptions: {
              // dock popup at bottom-right side of view
              buttonEnabled: false,
              breakpoint: false,
              position: 'bottom-right',
            },
          },
        });
        let trailheadsLayer = new FeatureLayer({
          url:
            'https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_EcomapSections_01/MapServer/1',
          outFields: ['*'],
        });

        mapView.on('click', function (event) {
          console.log(event);
          queryFeatures(event.screenPoint);
          function queryFeatures(screenPoint) {
            const point = mapView.toMap(screenPoint);
            trailheadsLayer
              .queryFeatures({
                geometry: point,
                // distance and units will be null if basic query selected
                spatialRelationship: 'intersects',
                returnGeometry: false,
                returnQueryGeometry: true,
                outFields: ['*'],
              })
              .then(function (featureSet) {
                // set graphic location to mouse pointer and add to mapview
                console.log(' ---- feature sets ------');
                console.log(featureSet.features);
                mapView.popup.open({
                  title: 'hello',
                  location: point,
                  features: featureSet.features[0],
                  featureMenuOpen: true,
                });
                //.then((e) => console.log('open'));
                mapView.popup.content = `<mat-card class="example-card">
                <mat-card-header>
                  <div mat-card-avatar class="example-header-image"></div>
                  <mat-card-title>Shiba Inu</mat-card-title>
                  <mat-card-subtitle>Dog Breed</mat-card-subtitle>
                </mat-card-header>
               
                <mat-card-content>
                  <p>
                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
                    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
                    bred for hunting.
                  </p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button>LIKE</button>
                  <button mat-button>SHARE</button>
                </mat-card-actions>
              </mat-card>
              `;
                // JSON.stringify(
                //     featureSet.features[0].attributes
                //   );
              })
              .catch((err) => console.log(err));
          }
        });
        map.add(trailheadsLayer);

        mapView.when(
          () => {
            // All the resources in the MapView and the map have loaded. Now execute additional processes
            this.mapLoaded.emit(true);
          },
          (err) => {
            console.error(err);
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  } // ngOnInit
}
