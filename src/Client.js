// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';
import { AboutUs } from './Models/AboutUs'
import { Home } from './Models/Home'
import { Organisation } from './Models/Organisation'


// configure type resolvers
let typeResolvers = [
  new TypeResolver('about_us', () => new AboutUs()),
  new TypeResolver('home', () => new Home()),
  new TypeResolver('organisation', () => new Organisation()),
];


function isPreview() {
  return previewApiKey !== "";
}

export default new DeliveryClient(
  new DeliveryClientConfig(projectId, typeResolvers,
    {
      // enablePreviewMode: isPreview(),
      // previewApiKey: previewApiKey
    }
  )
)