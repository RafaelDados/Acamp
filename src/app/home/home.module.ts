import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContainerModule } from '../shared/container/container.module';
import { UtilFormModule } from '../shared/util-form/util-form.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { CarouselModule } from '../shared/carousel/carousel.module';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        HomeComponent
    ],
    exports: [
        SigninComponent,
        SignupComponent
    ],
    imports : [
        CommonModule,
        ContainerModule,
        CarouselModule,
        RouterModule,
        ReactiveFormsModule,
        UtilFormModule,
        CarouselModule
    ]
})
export class HomeModule {

}