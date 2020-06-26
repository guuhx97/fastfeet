import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 2px solid #eee;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  nav {
    display: flex;
    align-items: center;

    img {
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999999;
      margin: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const User = styled.p`
  font-weight: bold;
`;

export const Logout = styled.p`
  color: red;
`;