import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdslistCard, AdsOneCard, AdscreateCard, AdsmoviesCard, AdsmusicCard } from './cards/adslistcard';
import { UsersCard, UsersOnlineCard } from './cards/userscard';
import { AuthCard } from './cards/authcard';
import { PromoCard } from './cards/promocard';
import { HomeCard, DialogShare, AsideCard } from './cards/homecard';
import { UpdateCard, StatusCard, DialogAsk, DialogStatus }  from './creators/statuscard';
import { ColorCard } from './creators/colorcard';
import { QuestionCard } from './creators/questioncard';
import { ShareCard, SocialCard } from './creators/sharecard';
import { CommentCard } from './creators/commentcard';
import { CommentsCard } from './cards/commentscard';
export { SimpleTinyCard } from './creators/SimpleTinyCard';
import { PromoCardList, AdslistlikeCard } from './cards/promolistcard';
import { AudiofileCard } from './cards/mediaplayerscard';
import { ContactCard } from './creators/chatcard';
export const SHARED_COMPONENTS = [
  AdslistCard, AdsOneCard, AdscreateCard, AdsmoviesCard, AdsmusicCard,
  UsersCard,
  UsersOnlineCard,
  AuthCard,
  PromoCard,
  HomeCard, DialogShare, AsideCard,
  UpdateCard, StatusCard, DialogAsk, DialogStatus,
  ColorCard,
  QuestionCard,
  ShareCard, SocialCard,
  CommentCard,
  CommentCard,
  CommentsCard,
  PromoCardList, AdslistlikeCard,
  AudiofileCard,
  ContactCard
];

export const ENTRY_COMPONENTS = [
  DialogAsk,
  DialogShare,
  DialogStatus 
];


export const TEMPLATE_COMPONENTS = [
  HeaderComponent,
  FooterComponent
];

