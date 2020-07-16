import React, { FC } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

const BlankLayout: FC<RouteConfig> = ({ route }) => {
  return <>{renderRoutes(route.routes)}</>;
};
export default BlankLayout;
