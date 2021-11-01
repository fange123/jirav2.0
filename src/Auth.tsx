import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";
import styled from "styled-components";
import { ReactComponent as SoftWearLogo } from "assets/software-logo.svg";
import { Row } from "components/lib";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectScreen from "./screens/project";

interface IProps {}

const Auth: React.FC<IProps> = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between>
      <HeaderLeft gap>
        <SoftWearLogo width="18rem" color="rgb(38,132,255)" />
        <p>项目1</p>
        <p>项目2</p>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button onClick={logout} type="link">
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link">hi,{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;

export default Auth;
