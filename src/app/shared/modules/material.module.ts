import { NgModule } from '@angular/core';
import { MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatListModule } from '@angular/material';

const MODULES = [
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatListModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class MaterialModule { }
