import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import TabRoutes from './tabs.routes';

const Routes = () => (
  <NavigationContainer>
    <TabRoutes />
  </NavigationContainer>
);

export default Routes;
