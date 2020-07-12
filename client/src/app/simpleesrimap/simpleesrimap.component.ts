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
  selector: 'app-simpleesrimap',
  templateUrl: './simpleesrimap.component.html',
  styleUrls: ['./simpleesrimap.component.css'],
})
export class SimpleesrimapComponent implements OnInit {
  // Private vars with default values
  private _zoom = 10;
  private _center = [0.1278, 51.5074];
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
    loadModules(['esri/Map', 'esri/views/MapView'])
      .then(([EsriMap, EsriMapView]) => {
        let map = new EsriMap({
          basemap: this._basemap,
        });

        let mapView = new EsriMapView({
          container: this.mapViewEl.nativeElement,
          center: this._center,
          zoom: this._zoom,
          map: map,
        });

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
