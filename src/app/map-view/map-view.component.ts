import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapViewComponent as TylerSpatialMapViewComponent, MapViewPointFeature } from '@tyler-spatial/mapview';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @ViewChild('mapView', { static: true })
  private mapViewElement: ElementRef;
  private tylerSpatialMapViewComponent: TylerSpatialMapViewComponent;

  constructor() {

  }

  ngOnInit(): void {
    this.initializeMapComponent();
  }

  private initializeMapComponent() {
    const mapServiceConfig = {
      geometryService: {
        serviceName: 'Public Esri Geometry',
        url: 'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
        onlineId: null,
        securePassword: null,
        secureUser: null,
        serviceSSO: null
      },
      geocodeService: {
        serviceName: 'World Geocoder',
        url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
        onlineId: null,
        securePassword: null,
        secureUser: null,
        serviceSSO: null
      },
      // printService: {
      //   serviceName: 'Munis Print Service',
      //   url: 'https://fmt107.tylertech.com/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
      // },
      // dataServices: [
      //   {
      //     serviceName: 'Tyler Demo',
      //     url: 'https://gisstage9999.tylerdemo.net/arcgis/rest/services/CityOfTyler/FeatureServer/',
      //     layers: [
      //       {
      //         includeLayer: true,
      //         layerId: 14,
      //         serviceLayerName: 'Hydrants'
      //       }
      //     ],
      //     zoomExtent: 'none'
      //   },
      // ],
      basemapServices: null
    };

    const mapPoints = [
      {
        address: '1 Tyler Drive Yarmouth ME 04086',
        longitude: -70.1887779,
        latitude: 43.7819812
      },
      {
        address: '370 US Route 1 Falmouth ME 04105',
        longitude: -70.222409,
        latitude: 43.739053
      }
    ];
    this.tylerSpatialMapViewComponent = new TylerSpatialMapViewComponent({
      mapviewElement: this.mapViewElement.nativeElement,
      serviceConfig: mapServiceConfig,
      includePopoutButton: true,
      quickAccessTools: [
        // 'None'
        // 'FeatureSelect'
        // 'ServiceQuery'
        // 'Layers'
        // 'Legend'
        // 'Sketch'
        // 'BasemapGallery'
        // 'AttributeSearch'
        // 'Print'
        // 'Bookmarks'
        // 'Measure'
        // 'Clear'
        // 'FeatureList'
        // 'FeatureDetail
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
      ],
      callbacks: {
        mapLoaded: () => {
          this.tylerSpatialMapViewComponent.addCustomActions([
            {
              name: 'Custom action',
              caption: 'Custom action caption',
              iconName: '360',
              iconType: 'component',
              callback: () => console.log('Custom action callback')
            }
          ]);
          this.tylerSpatialMapViewComponent.setMapViewBookmarks([{
            name: 'Maine',
            extent: {
              xmin: -8266310.878201832,
              ymin: 5188041.891495028,
              xmax: -7163171.685990461,
              ymax: 6085718.351675899,
              spatialReference: {
                wkid: 102100,
                latestWkid: 3857
              }
            }
          }]);
          this.tylerSpatialMapViewComponent.addGraphicStyles([{
            name: 'black',
            type: 2,
            legendInfo: {
              label: 'Black Polygon',
              color: 'black'
            }
          } as any]);
          const mapFeatures = [];
          mapPoints.forEach((mp, i) => {
            const attributes = {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Address: mp.address,
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Latitude: `${mp.latitude}`,
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Longitude: `${mp.longitude}`,
            };

            mapFeatures.push(new MapViewPointFeature(
              i,
              'Point location',
              {
                geometry: {
                  x: mp.longitude,
                  y: mp.latitude
                },
                attributes
              }
            ));
          });

          this.tylerSpatialMapViewComponent.addFeatures(mapFeatures).then(() => {
            this.tylerSpatialMapViewComponent.zoom('ALL');
          });
        }
      }
    });
  }

}
