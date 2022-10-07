import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TransfersPage } from './transfers/transfers.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./transfers/transfers.module').then((m) => m.TransfersPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
