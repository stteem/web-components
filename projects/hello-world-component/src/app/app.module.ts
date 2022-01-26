import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [HelloWorldComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap { 

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(HelloWorldComponent, {injector});
    customElements.define('hello-world', webComponent);
  }

  ngDoBootstrap() {}
}
