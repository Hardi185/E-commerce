import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { PaginationComponent } from 'path/to/pagination/component';
import{SearchServiceService} from 'src/app/service/search-service.service';
import { ActivatedRoute } from '@angular/router';
import{BehaviorSubject,Observable,combineLatest,map,of} from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  searchKey: string = "";
  sortOrder:string="";
  pageNumber!: number;
  pageSize!: number;
  totalItems = 0;
  constructor(private api: ApiService, private cartService: CartService,private searchService:SearchServiceService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageNumber = +params.get?('pageNumber') || 1;
      this.pageSize = +params.get?('pageSize') || 10;
      this.getItems();
    });
    this.api.getProduct()
    .subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach
        ((a: any) => {
          // if(this._gadgetCategory.findIndex(a.category) >= 0)
          //   a.category = "Gudgets";
          if (a.category === "Laptop" || a.category === "Camera" || a.category === "Electronics" || a.category === "Smartphone" || a.category === "TV" || a.category === "Watches" || a.category === "Accessories") {
            a.category = "Gudgets"
          }
          if (a.category === "Shoes" || a.category === "Fashion") {
            a.category = "fashion"
          }
          if (a.category === "Jewellery") {
            a.category = "jewellery"
          }
          a.quantity = 1;
          a.total = a.price;
        }
        );
      console.log(this.productList);
    });


  this.cartService.search.subscribe((val: any) => {
    this.searchKey = val;
  })
  
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  
  filter(category: string) {
    this.filterCategory = this.productList
                            .filter(
                              (a: any) => a.category == category || category == '');
  }
  
  sortByName(order:string) 
  {
      this.sortOrder = order;
  } 

  // onPageNumberChange(event:any){
  //   this.page=event;
  //   return this.filterCategory;
  // }

  // onSizeChange(event:any):void{
  //   const value = event.target.value;
  //   const parsedValue = parseInt(value);
  //   if (Number.isNaN(parsedValue) || parsedValue <= 0) {
  //       this.tableSize = 12;
  //   } else {
  //       this.tableSize = parsedValue;
  //   }
  //   this.page = 1;
  //   this.filterCategory;
  // }

  onPageChanged(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.itemsPerPage;
    this.getItems();
  }

  private getItems() {
    this.api.getItems(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.filterCategory = response.items;
        this.totalItems = response.totalCount;
      });
  }

}

// <div  class="container">
//     <div class="row nav-page">
//         <pagination-controls
//             previousLable="Prev"
//             nextLable="Next"
//             (pageChange)="onPageNumberChange($event)"
//         >
//         </pagination-controls>
//     </div>
//     <div class="row">
//         <ng-container *ngFor="let item of filterCategory| filter:searchKey:'name' | sortAsc:sortOrder |paginate:{
//             itemsPerPage: tableSize,
//             currentPage:page,
//             totalItems:count}; let i=index" >
//             <div class="card col-md-3">
//                 <img src="{{item.image}}" alt="">
//                 <h5>{{item.name}}</h5>
//                 <p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 100ch;">{{item.description}}</p>
//                 <p><strong>Price:</strong> ${{item.price}}</p>
//                 <button class="btn btn-dark " (click)=addtocart(item)>Add to cart</button>
//             </div>
//         </ng-container>
//     </div>

// </div>



