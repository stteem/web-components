# How to create Angular WebComponents

First, start a new Angular app with a special flag that creates an empty app. It only creates config files and no boilerplate code (AppModule/AppComponent and etc…)
Run `ng new web-components --createApplication=false`

Create a Web Component; inside our new project directory. The skipInstall flag tells it to skip reinstalling any dependencies:
Run `ng generate application FirstWebComponent  --skipInstall=true`

Add the @angular/elements library so we can use it to turn our components into Web Components.
`ng add @angular/elements`

Next, create an Angular component which will become a Web Component; inside our newly made project:
`ng generate component HelloWorld`

Make Angular understand that we don’t want it to treat this component as a common Angular component, but rather as something different. This is done in the module bootstrapping level — to do that, implement the `ngDoBootstrap` method in `AppModule` and tell the module to define a custom element. For that we are going to use the createCustomElement function from the `@angular/elements` package.

`import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

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
}`

We have done the following in the code above:

1. Pass the injector to our Web Component manually. This is to ensure that dependency injection works at runtime.

2. Put our component in the entryComponents array. This is required for the Web Component to be bootstrapped.

3. `createCustomElement` is a function that turns an angular component into a Web Component — we pass the result of that function to `customElements.define`, rather than our Angular component.

4. The selector of our Angular component is irrelevant. How it will be called from some other HTML template is determined by the string that we pass to the `customElements.define` function. In this case, it will be called as <hello-world></hello-world>

5. The selector we pass to the `customElements.define` function has to consist of two or more words separated by dashes, eg. <hello-world></hello-world>. This is rather a demand from the Custom Elements API so it can differentiate custom elements from native HTML tags.

6. Import and add `CUSTOM_ELEMENTS_SCHEMA` to tell angular that it's a web component


Next step is building the app! Run `ng build HelloWorldComponent`

To use the built web component in a basic web page, copy all the built files to a folder in target project.

To use it in a plain HTML app, include all built JavaScript files in script tags and then use the component as shown in example below:

<html>
  <head>
    <script src="./built-files/polyfills.js"></script>
    <script src="./built-files/runtime.js"></script>
    <script src="./built-files/styles.js"></script>
    <script src="./built-files/scripts.js"></script>
  </head>

  <body>
    <hello-world></hello-world>
  </body>
</html>


