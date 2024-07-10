import { RouteMeta } from '@analogjs/router';
import { environment } from 'src/environments/environment';

export const routeMeta: RouteMeta = {
  redirectTo: environment.survivalKitPageLink,
  pathMatch: 'full',
};
