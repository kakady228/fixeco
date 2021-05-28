/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import GoogleMapsApiLoader from 'google-maps-api-loader'
  const component: DefineComponent<{}, {}, any>
  export default component
}
