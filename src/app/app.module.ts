import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AccessGuardService } from './shared/services/access-guard.service';
import { EmitterService } from './shared/services/emitter.service';
import { ErrorSnackService } from './shared/services/error-snack.service';
import { HttpRequestService } from './shared/services/http-request.service';
import { CheckUserService } from './shared/services/check-user.service';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NavbarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutes,
    CustomMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    AccessGuardService,
    EmitterService,
    ErrorSnackService,
    HttpRequestService,
    CheckUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
