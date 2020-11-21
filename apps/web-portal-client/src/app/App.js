import React from 'react';
import Layout from '../components/layout/Layout';
import HeaderLayout from '../components/layout/HeaderLayout';
import SidebarLayout from '../components/layout/SidebarLayout';
import ContentLayout from '../components/layout/ContentLayout';

export default function App() {
  return (
    <Layout
      renderHeader={() => <HeaderLayout />}
      renderSideBar={() => <SidebarLayout />}
      renderContent={() => <ContentLayout />}
    />
  );
}
