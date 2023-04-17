import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import{ApiService} from 'src/app/service/api.service';
import{SearchServiceService} from 'src/app/service/search-service.service';

import{BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  public totalItem: number = 0;
  
  public productList = <any>([]);
  public searchTerm !: string;
  // @Output() search: EventEmitter<string> = new EventEmitter<string>();
  constructor(public cartService: CartService,private apiService: ApiService,private searchService:SearchServiceService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length; 
      })
     
  }

  // search(productName: string) {

  //   this.searchTerm.emit(productName);
  //     this.searchTerm = productName;
  //     this.searchProducts();
  // }

//   searchProducts() {

//   if (!this.searchTerm) {
//     this.productList.emit(null);
//     return;
//   }

//   this.apiService.searchProducts(this.searchTerm).subscribe((data) => {
//     this.productList.emit(data);
//   });

// }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  // search(event: any) {
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.apiService.searchProducts(new BehaviorSubject<string>(this.searchTerm)).subscribe((res: any) => {
  //     this.productList = res;
  //   });
  // }
  
}

//The exclamation mark after "searchTerm" indicates that it will be initialized later.

//subscribe() method
//let's say you're a fan of a particular YouTube channel. If you want to receive notifications whenever that channel uploads a new video, 
//you can subscribe to the channel. By doing so, you'll get an alert every time a new video is posted.
//same a this method notifies the component 

// here "getProducts" calls the method of "CartService" to retrieve the products in the cart. 
// Once the products are retrieved, the "length" property of the array is assigned to "totalItem" using res

// The search function takes an event object as its parameter. 
// The function is likely an event handler function that is triggered when the user performs an action 
// such as typing a search query into a search box.
//In this.searchTerm will assign the value of the input element's value that triggered the event.
//the value we have in input box is accessed through the event object's target property
//Since the target property is of type EventTarget, it needs to be cast to an HTMLInputElement in order to access the value property in the input box

// [(ngModel)]="searchTerm" binds the input value of the search box to the "searchTerm" variable in the component's TypeScript file.
//(keyup)="search($event)" binds the keyup event of the search box to the "search" function in the component's TypeScript file. 
//So, whenever the user types something in the search box, the "search" function gets called and it takes the event object as a parameter.
// <input type="text" class="form-control" [(ngModel)]="searchTerm" (keyup)="search($event)"  placeholder="search products">