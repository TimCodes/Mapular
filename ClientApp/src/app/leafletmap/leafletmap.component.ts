import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createPopUpContent } from './helpers';

import * as L from 'leaflet';
@Component({
  selector: 'app-leafletmap',
  templateUrl: './leafletmap.component.html',
  styleUrls: ['./leafletmap.component.scss'],
})
export class LeafletmapComponent implements OnInit {
  private map;
  public forecasts: any;

  constructor(http: HttpClient) {
    http.get('api/SampleData/sites').subscribe(
      (result) => {
        console.log(result);
        this.forecasts = result;
        this.initMap();
      },
      (error) => console.error(error)
    );
  }

  ngOnInit(): void {}

  private initMap(): void {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 23,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map = L.map('map', {
      center: [42.62222, -112.03444],
      zoom: 17,
    });

    tiles.addTo(this.map);

    L.geoJSON(this.forecasts, {
      style: function (feature) {
        switch (feature.properties.status) {
          case 'reserved':
            return { color: '#ff0000' };
          case 'open':
            return { color: '#0000ff' };
        }
      },
    })
      .bindPopup(function (layer) {
        let { siteId, price, status } = layer.feature.properties;
        return createPopUpContent(siteId, status, price);
      })
      .addTo(this.map);
  }
}
