import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Navigation, Header } from "components";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="h-full">
      {/* <Sider trigger={null} collapsible collapsed={collapsed}> */}
      <Sider trigger={null}>
        <Navigation />
      </Sider>
      <Layout>
        <Header {...{ collapsed, setCollapsed }} />
        <Content className="overflow-auto p-[16px] min-h-[280px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
