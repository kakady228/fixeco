/* eslint-disable no-undef */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-browser-geolocation';
declare var google: any;
declare var map: any;