// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';
import { AboutUs } from './Models/AboutUs'
import { Home } from './Models/Home'
import { Organisation } from './Models/Organisation'
const projectId = '3500299f-e111-4d99-ac95-1e212d5aa595';
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdlZkbUdwcVh4aWtnaE1BNTlOdmQwIiwNCiAgImVtYWlsIjogInBhdWxpbmV0aG9ybmJlcmdAZ21haWwuY29tIiwNCiAgInByb2plY3RfaWQiOiAiMzUwMDI5OWYtZTExMS00ZDk5LWFjOTUtMWUyMTJkNWFhNTk1IiwNCiAgImp0aSI6ICJzcHhKclRibkRCd21CWlBZIiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJnaXZlbl9uYW1lIjogIlBhdWxpbmUiLA0KICAiZmFtaWx5X25hbWUiOiAiVGhvcm5iZXJnIiwNCiAgImF1ZCI6ICJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSINCn0.2IJU1MktbMPmrwQF7fFgZcSe9Npix3VQ9YiSlMiIK18";


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
      enablePreviewMode: isPreview(),
      previewApiKey: previewApiKey
    }
  )
)