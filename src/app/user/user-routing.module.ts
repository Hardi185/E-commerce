import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ListComponent} from './list/list.component'

console.warn("user module loaded")
const routes: Routes = [
    {path : 'login', component:LoginComponent},
    {path : 'list' , component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
