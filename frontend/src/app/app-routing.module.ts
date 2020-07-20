import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskviewComponent } from './pages/taskview/taskview.component';
import { NewListComponent } from './pages/new-list/new-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch:'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'lists', component: TaskviewComponent},
  { path: 'lists/:listId', component: TaskviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
