import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-leafletmap',
  templateUrl: './leafletmap.component.html',
  styleUrls: ['./leafletmap.component.scss'],
})
export class LeafletmapComponent implements OnInit {
  private map;
  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    tiles.addTo(this.map);

    var states = [
      {
        type: 'Feature',
        properties: { party: 'Republican' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-104.05, 48.99],
              [-97.22, 48.98],
              [-96.58, 45.94],
              [-104.03, 45.94],
              [-104.05, 48.99],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { party: 'Democrat' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-109.05, 41.0],
              [-102.06, 40.99],
              [-102.03, 36.99],
              [-109.04, 36.99],
              [-109.05, 41.0],
            ],
          ],
        },
      },
    ];

    L.geoJSON(states, {
      style: function (feature) {
        switch (feature.properties.party) {
          case 'Republican':
            return { color: '#ff0000' };
          case 'Democrat':
            return { color: '#0000ff' };
        }
      },
    }).addTo(this.map);
  }
}
