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

import { createPopUpContent } from './helpers';

@Component({
  selector: 'app-featurelayeresri',
  templateUrl: './featurelayeresri.component.html',
  styleUrls: ['./featurelayeresri.component.css'],
})
export class FeaturelayeresriComponent implements OnInit {
  // Private vars with default values
  private _zoom = 5;
  private _center = [-96.7, 40.81];
  private _basemap = 'terrain';

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
          queryFeatures(event.screenPoint);
          function queryFeatures(screenPoint) {
            const point = mapView.toMap(screenPoint);
            trailheadsLayer
              .queryFeatures({
                geometry: point,
                spatialRelationship: 'intersects',
                returnGeometry: false,
                returnQueryGeometry: true,
                outFields: ['*'],
              })
              .then(function (featureSet) {
                let attributes = featureSet.features[0].attributes;

                mapView.popup.open({
                  title: attributes['DIVISION_NAME'],
                  location: point,
                  features: featureSet.features[0],
                  featureMenuOpen: true,
                });

                mapView.popup.content = createPopUpContent(
                  attributes['DIVISION_NAME'],
                  attributes['MAP_UNIT_DESCRIPTION']
                );
              })
              .catch((err) => console.log(err));
          }
        });
        map.add(trailheadsLayer);

        mapView.when(
          () => {
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
  }
}
