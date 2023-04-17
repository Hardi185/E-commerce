import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest ,Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private itemsSubject = new BehaviorSubject<any>(null);
  private pageNumberSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(10);

  private baseUrl = 'https://localhost:5001/api/product';
  constructor(private http: HttpClient) {
    // combineLatest([this.pageNumberSubject, this.pageSizeSubject]).pipe(
    //   map(([pageNumber, pageSize]) => this.getItems(pageNumber, pageSize))
    // ).subscribe();
   }

  getProduct(): Observable<any[]> {
    return this.http.get<any>("https://localhost:5001/api/product")
      //return this.http.get<any>("https://localhost:5001/api/product")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  private apiUrl = 'https://fake-e-commerce-api.onrender.com/product/search/';
  searchProducts(productName$: BehaviorSubject<string>): Observable<any> {
    const url = `${this.apiUrl}${productName$.value}`;
    return this.http.get<any>(url);
  }
  
  // getItems(pageNumber: number, pageSize: number){
  //   const url = `${this.baseUrl}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  //   return this.http.get<any>(url);
  // }
  
  getItems(pageNumber$: BehaviorSubject<number>, pageSize$: BehaviorSubject<number>): Observable<any> {
    combineLatest([pageNumber$, pageSize$]).pipe(
      switchMap(([pageNumber, pageSize]) => {
        const url = `${this.baseUrl}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.http.get<any>(url);
      })
    ).subscribe(items => {
      this.itemsSubject.next(items);
    });
    return this.itemsSubject.asObservable();
  }
  
  setPageNumber(pageNumber: number) {
    this.pageNumberSubject.next(pageNumber);
  }
  
  setPageSize(pageSize: number) {
    this.pageSizeSubject.next(pageSize);
  }
  
}

// getItemsObservable() {
//     return this.itemsSubject.asObservable();
//   }
  // getProducts(): Observable<any[]> {
  //   return this.http.get<any>("https://fake-e-commerce-api.onrender.com/product").pipe(
  //     map(products => products.sort((a:any, b:any) => a.name.localeCompare(b.name)))
  //   );
  // }
//class @Injectable decorator, which allows it to be injected as a dependency into other classes.
//HttpClient makes it possible to get data from the mentioned URL
//provides a way to make HTTP requests to remote servers from an Angular application.
//pipe is used to trasform string ,dates to other types for display
//In the provided code snippet, the map operator is used to transform the response data from the server into a format that can be consumed by the application(makes it observable).