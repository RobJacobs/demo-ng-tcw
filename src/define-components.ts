// TODO import individual components
import { defineComponents as tylerDefineComponent } from '@tylertech/tyler-components-web';
import { defineLandingPageLayoutComponent } from '@tyler-components-web/landing-page-layout';

export const defineComponents = () => {
  tylerDefineComponent();
  defineLandingPageLayoutComponent();
};
