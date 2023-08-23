import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';
import TabRoutes from './tabs.routes';

const Routes = () => (
  <NavigationContainer>
    <TabRoutes />
  </NavigationContainer>
);

export default Routes;
