import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  {path:'', redirectTo:'products',pathMatch:'full'},
  //{path:'', redirectTo:'products/items?pageNumber=1&pageSize=10',pathMatch:'full',component:ProductsComponent},
  {path:'products' ,component: ProductsComponent},
  // { path: 'products/:pageNumber/:pageSize', component: ProductsComponent },
  {path:'cart', component: CartComponent},
  {path:"admin", loadChildren:()=>import('./admin/admin.module')
   .then(mod=>mod.AdminModule)
  },
  {path:"user", loadChildren:()=>import('./user/user.module')
   .then(mod=>mod.UserModule)
  },
  // {
  //   path:"cart" ,loadChildren:()=>import('./cart/cart.module')
  //   .then(mod=>mod.CartModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//pathMatch fully makes it strict that URL should be exact same as we want ,otherwise it would not be valid