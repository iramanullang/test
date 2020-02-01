import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, empty } from 'rxjs';
import { EmployeeService, CustomerService } from '../services/app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() name = 'Gak Ada Nama';
  @Input() code: string;
  lat: number;
  lng: number;
  zoom: number;
  companyName = 'company';
  branchName = 'branch';
  employees: any[];
  filEmp: any[];
  customers: any[];
  showlist = {};
  loaded = false;
  selectedImei: '';
  map: any;
  infoWindowOpened = null;
  custInfoWindow = null;

  private itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFirestore, private employeeService: EmployeeService, private customerService: CustomerService) {
    this.itemCollection = this.db.collection(this.companyName).doc('id').collection(this.branchName);
    this.items = this.itemCollection.valueChanges();
  }

  ngOnInit() {
    this.getUserLocation();
    this.getEmployeeData();
    this.getCustomerData();
  }

  private getEmployeeData() {
    this.employeeService.getAll()
      .subscribe(
        data => {
          // console.log(data);
          this.employees = data;
          this.filEmp = this.employees.filter(a => a.DeviceImei !== null);
          this.filEmp.forEach(value => {
            if (value.DeviceImei) {
              this.showlist[value.DeviceImei] = value;
              return this.showlist;
            }
          });
          this.loaded = true;
        },

        // err => console.error(err),

        () => console.log('done loading locations')
      );
  }

  //search data imei from data array employee
  public hasdata(imei) {
    if (this.showlist[imei])
      return true;
    else
      return false;
  }

  // filter() {
  //   this.infoWindowOpened = null;
  //   // redraw the map with filtered markers
  // }

  //show & hide Info Window When clicked
  showSalesInfoWindow(infoWindow, index) {
    if (this.infoWindowOpened === infoWindow) {
        return;
    }

    if (this.infoWindowOpened !== null) {
        this.infoWindowOpened.close();
    }
    
    this.infoWindowOpened = infoWindow;   
  }

  showCustInfoWindow(infoWindow, index){
    if (this.custInfoWindow === infoWindow){
      return;
    }
    
    if(this.custInfoWindow !== null){
      this.custInfoWindow.close();
    }

    this.custInfoWindow = infoWindow;
  }

  getCustomerData(){
    this.customerService.getAllWithLatLng()
    .subscribe(
      data => {
        this.customers = data;
        //console.log(this.customers);
        return this.customers;
      }
    )
  }

  // HideImei(){
  //   this.hideImei = this.employees.filter(a => a.DeviceImei !== null)
  //   return this.hideImei;
  // }

  /*searchText() {
    this.showEmp = this.employees.filter(a => a.Name.toLowerCase().includes(this.search));
    return this.showEmp;
  }*/
 
  //declare map value replace with map
  protected mapReady(map) {
    this.map = map;
  }

  //search select sales location and show sales location
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      })
    }
  }
  
  public panTo() {
    const imei = this.selectedImei;
    let lat = 0;
    let lng = 0;
    this.itemCollection.get().forEach(a => {
      a.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const emp = doc.data().employee;
        if (emp.imei === imei) {
          lat = emp.locations[emp.locations.length - 1].location._lat;
          lng = emp.locations[emp.locations.length - 1].location._long;
        }
      });
    }).finally(() => {
      if (lat !== 0 && lng !== 0) {
        if (this.map) {
          this.map.panTo({ lat, lng });
        }
      }
    });
  }
}