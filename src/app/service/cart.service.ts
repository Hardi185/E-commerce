import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  public cartItemList : any =[]
  //public sortOrder?:string;
  public productList = new BehaviorSubject<any>([]);
  
  //public $productList = this.productList.asObservable();
  public search = new BehaviorSubject<string>("");
  public search1=new BehaviorSubject<string>("");
  public sortOrder = new BehaviorSubject<string>("");

  constructor(private api:ApiService) { }

  getProducts(){
    return this.productList.asObservable();
  }
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product._id=== a._id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  compareByName(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  
  sortProducts(sortOrder: 'asc' | 'desc'| ' ') {
    const productList=this.productList.getValue();
    productList.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  searchProduct()
  {
    this.api.searchProducts(this.search);
  }
  
}


//cartItemList is an array that holds the items in the cart. 
//productList is a BehaviorSubject that holds the list of products in the cart as an observable. 
//search is a BehaviorSubject that holds the search query as an observable.

//This method returns the productList as an observable, 
//which means that it can be subscribed to by other components to get updates whenever the cart items change.