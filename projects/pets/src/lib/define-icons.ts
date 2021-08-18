import { TylerIconRegistry } from '@tylertech/tyler-components-web';

import { tylIconArrowBack } from '@tylertech/tyler-icons/standard';

const standardIcons = [tylIconArrowBack];

export const defineIcons = () => {
  TylerIconRegistry.define(standardIcons);
};
