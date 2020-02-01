import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/app.service';
import { Observable } from '../../../node_modules/rxjs';



@Component({
  selector: 'app-listsalesman',
  templateUrl: './listsalesman.component.html',
  styleUrls: ['./listsalesman.component.scss']
})

export class ListsalesmanComponent implements OnInit {
  showlist: any[];
  order:boolean = false;
  salesmans: any[];
  search = '';
  displayedColumns=['code', 'name', 'order', 'promo', 'customer', 'product', 'total'];

  public opendetail(id: string) {
    // console.log(id);
    this.router.navigate(['/main/detailsalesman/' + id]);
  }

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getListsalesmans();
  }

  //function get list salesmans untuk ambil data list salesman dari API
  getListsalesmans(){
    this.employeeService.EmployeeGetPerformance(null, null, null)
    .subscribe(
      data => {
        // console.log(data);
        this.salesmans = data; // untuk menampilkan data si list salesman
        this.showlist = data; //untuk menampilkan list search
      },    
       err => console.error(err),
       () => console.log('done loading listsalesmans')
    );
  }

  searchText() {
    // filter data dari salesman sesuai yang dicari dengan variable
    this.showlist = this.salesmans.filter(a => a.Code.toLowerCase().includes(this.search) || a.Name.toLowerCase().includes(this.search));
    return this.showlist;
  }
  sortData() {
    if (this.order) {
      this.showlist = this.salesmans.sort((i, j) => (j.id > i.id ? -1 : 1));
    }
    else {
      this.showlist = this.salesmans.sort((i, j) => (j.id > i.id ? 1 : -1));
    }
    
    this.order = !this.order;
  }
}