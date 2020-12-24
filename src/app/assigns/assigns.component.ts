import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { Product } from './product';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';


// interface DataItem {
//   title: string;  filter
//   subject: string; filter
//   dateasgn: number; sort
//   datesub: number; sort
// }

@Component({
  selector: 'app-assigns',
  templateUrl: './assigns.component.html',
  styleUrls: ['./assigns.component.scss']
})
export class AssignsComponent implements OnInit {
  products: Product[];
  datasource: Product[];
  loading: boolean;
  totalRecords: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(
      data => {this.products = data;    
  });

    // loadCustomers(event: LazyLoadEvent) {  
    //   this.loading = true;

      //in a real application, make a remote request to load data using state metadata from event
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

      //imitate db connection over a network
      // setTimeout(() => {
      //   if (this.datasource) {
      //     this.products = this.datasource.slice(event.first, (event.first + event.rows));
      //     this.loading = false;
      // }
      // }, 1000);
  }
    













  // listOfColumn = [
  //   {
  //     name: 'Title'
  //   },
  //   {
  //     name: 'Subject'
  //   },
  //   {
  //     name: 'Date Assigned',
  //     compare: (a: DataItem, b: DataItem) => a.dateasgn - b.dateasgn,
  //     priority: 1
  //   },
  //   {
  //     name: 'Deadline',
  //     compare: (a: DataItem, b: DataItem) => a.datesub - b.datesub,
  //     priority: 3
  //   }
  // ];
  // listOfData: DataItem[] = [
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   }
  // ];
}
