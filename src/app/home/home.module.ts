import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContainerModule } from '../shared/container/container.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    exports: [
        SigninComponent,
        SignupComponent
    ],
    imports : [
        CommonModule,
        ContainerModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class HomeModule {

}