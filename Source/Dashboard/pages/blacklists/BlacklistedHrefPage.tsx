import * as React from 'react';

import ModuleListDomBlocker from '../../../AppFiles/Modules/ModuleListDomBlocker';

import WebsiteContainer from '../../../AppFiles/Modules/WebsiteContainer';

class BlacklistedHrefPage extends React.Component {
  render(): JSX.Element {
    return (
      <WebsiteContainer
      loginRequired={false}
      contentData={
        <ModuleListDomBlocker 
          storageName='blacklistedElementsHref'
        />
      }
    />
    );
  }
}

export default BlacklistedHrefPage;
