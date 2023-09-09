import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import StackLoginRoutes from './stack.routes';

const Routes = () => (
  <NavigationContainer>
    <StackLoginRoutes />
  </NavigationContainer>
);

export default Routes;
