import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { SharedOptionsService }  from './services/sharedOptions.service';

import { AppComponent }  from './components/app/app.component';
import { HomeComponent }  from './components/home/home.component';
import { DocumentComponent }  from './components/document/document.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'document/:sourceId', component: DocumentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
	imports:      
	[ 
		BrowserModule, 
		HttpModule, 
		RouterModule.forRoot(appRoutes), 
		FormsModule
	],
  declarations: [ AppComponent, HomeComponent, DocumentComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ SharedOptionsService ]
})
export class AppModule { }
