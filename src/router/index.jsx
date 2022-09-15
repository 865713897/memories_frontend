import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { routes } from './routes';

function Router() {
  // 获取component
  function renderRoute(_routes) {
    return _routes.map((route) => {
      const { Component, path, children = [], exact = false, name } = route;
      if (children.length && !Component) {
        return (
          <Route path={path} key={path} exact={exact}>
            {renderRoute(children)}
          </Route>
        );
      } else if (children.length) {
        return (
          <Route key={`${path}${name}`}>
            <Route path={path} key={path} exact={exact} element={<Component />} />
            {renderRoute(children)}
          </Route>
        );
      }
      return <Route path={path} key={path} exact={exact} element={<Component />} />;
    });
  }

  return (
    <HashRouter>
      <Routes>
        {renderRoute(routes)}
        <Route path="*" element={<Navigate to="/user/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
