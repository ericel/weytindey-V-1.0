import { ApiService } from './api/api.service';
import { EasyapiService } from './easyapi/easyapi.service';
import { ListingService } from './listing/listing.service';
import { AuthService } from './auth/auth.service';
import { StatusService } from './status/status.service';
import { StoreHelper } from './store-helper';
import { GeolocationService } from './geolocation/geolocation';
import { PageService } from './page/page.service';
import { PageweyService } from './pagewey/pagewey.service';
import { NotificationService } from './notification/notification.service';
import { MediaService } from './media/media.service';
import { MessengerService } from './messenger/messenger.service';
export const SERVICE_PROVIDER = [
  ApiService,
  EasyapiService,
  StoreHelper,
  AuthService,
  ListingService,
  StatusService,
  GeolocationService,
  PageService,
  NotificationService,
  MediaService,
  MessengerService,
  PageweyService
];
