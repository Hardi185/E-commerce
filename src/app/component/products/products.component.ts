import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute,Router } from '@angular/router';
import{SearchServiceService} from 'src/app/service/search-service.service';
import{BehaviorSubject,Observable,combineLatest,map,of, switchMap} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  public items:any;
  searchKey: string = "";
  sortOrder:string="";
  pageNumber!: number;
  pageSize!: number;
  totalItems = 0;
  pageNumber$ = new BehaviorSubject<number>(1);
 pageSize$= new BehaviorSubject<number>(10);
 
 //items$ = this.api.getItems(this.pageNumber$, this.pageSize$);
  
  constructor(private api: ApiService, private cartService: CartService,private searchService:SearchServiceService,private route: ActivatedRoute,private router: Router) {
   }
  
  
  ngOnInit(): void {
    // this.items$ = this.api.getItems(this?.pageNumber$, this?.pageSize$);

    // this.items$.subscribe(items => {
    //   console.log(items);
    // });
  
    this.route.queryParamMap.subscribe(params => {
          let pageNumberParam = params.get('pageNumber')!;
          let pageSizeParam = params.get('pageSize')!;
          // let pageNumberParam1 = pageNumberParam ? +pageNumberParam : 1;
          // let pageSizeParam1 = pageSizeParam ? +pageSizeParam : 10;
          console.log(`Befoooore: ${pageNumberParam}, ${pageSizeParam}`);

          // this.pageNumber$ = new BehaviorSubject<number>(pageNumberParam1);
          // this.pageSize$ = new BehaviorSubject<number>(pageSizeParam1);
          this.pageNumber = pageNumberParam ? +pageNumberParam : 1;
          this.pageSize = pageSizeParam ? +pageSizeParam : 10;

          // console.log(`Afterr: ${this.pageNumber$}, ${this.pageSize$}`);
          
          this.router.navigate(['products'], {queryParams: {pageSize: this.pageSize, pageNumber: this.pageNumber }});
          // this.router.navigateByUrl('/products/1/10');
          console.log(this.route.paramMap);
          console.log(this.pageNumber);
          console.log(this.pageSize);
          console.log(this.filterCategory);
          
    });
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach
          ((a: any) => {
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
        //console.log(this.productList);
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }
  
 
  //this will happen when we click on add to cart so that's why we didn't add it to onInit()
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

  onClick(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.pageSize = 10;
    console.log('Page number changed to', this.pageNumber);
    this.router.navigate(['products'], {
      queryParams: {pageNumber: this.pageNumber ,pageSize: 10}
    });
    // this.pageNumber$.next(this.pageNumber);
    // this.pageSize$.next(10);
    //this.getItems(this.pageNumber$,this.pageSize$);
  }

  // getItems(pageNumber: number, pageSize: number) {
  //   combineLatest([pageNumber, pageSize]).pipe(
  //     switchMap(([pageNumber, pageSize]) => this.api.getItems(pageNumber, this.pageSize))
  //   ).subscribe(response => {
  //     this.items = response.items;
  //     console.log(this.filterCategory);
  //     this.totalItems = response.totalCount;
  //   });
  // }

  }


  // onPageChanged(event: any) {
  //   this.pageNumber = event.page;
  //   this.pageSize = event.itemsPerPage;
  //   this.router.navigate(['products'], {queryParams: {pageNumber: this.pageNumber ,pageSize: this.pageSize}});
  //   // console.log(abc);
  //   //this.router.navigate(['products', this.pageNumber, this.pageSize]);
  //   //this.getItems();
  // }
  
  // getItems(){
  //   this.api.getItems(this.pageNumber, this.pageSize)
  //   .subscribe(response => {
  //     this.filterCategory = response.items;
  //     console.log(this.filterCategory);
  //     this.totalItems = response.totalCount;
  //   });
  // }
  // onPageSizeChanged(event: any) {
  //   const newPageSize = event.itemsPerPage;
  //   console.log('Page size changed to', newPageSize);
  //   this.pageSize$.next(newPageSize);
  // }

 
// postList():void{
  //   this.api.getProduct().subscribe((response)=>{
  //     this.filterCategory=response;
      
  //   })
  // }

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

//ProductsComponent class implements the OnInit interface, 
//which requires a ngOnInit() method that is called when the component is initialized

//productList property is used to store the list of products retrieved from the API, 
//while filterCategory is used to store a filtered version of the product list based on the selected category

//Object.assign() method is used to add new properties to each product, including quantity and total

// The filter() method takes a category as an argument and filters the productList based on the selected category. 
// The filtered list is then assigned to filterCategory.
// <ng-container *ngFor="let item of filterCategory| filter:searchKey:'name' | sortAsc:sortOrder " >

// <nav aria-label="Page navigation example">
//             <ul class="pagination">
//               <li class="page-item">
//                 <a class="page-link color" href="#" aria-label="Previous">
//                   <span aria-hidden="true">&laquo;</span>
//                   <span class="sr-only">Previous</span>
//                 </a>
//               </li>
//               <li class="page-item"><a class="page-link color" href="#">1</a></li>
//               <li class="page-item"><a class="page-link color" href="#">2</a></li>
//               <li class="page-item"><a class="page-link color" href="#">3</a></li>
//               <li class="page-item">
//                 <a class="page-link color" href="#" aria-label="Next">
//                   <span aria-hidden="true">&raquo;</span>
//                   <span class="sr-only">Next</span>
//                 </a>
//               </li>
//             </ul>
//           </nav>