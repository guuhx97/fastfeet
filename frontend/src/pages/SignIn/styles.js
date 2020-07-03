import { darken } from 'polished';
import styled from 'styled-components';

export const Span = styled.p`
  color: #666;
  align-self: flex-start;
  margin: 20px 0 10px;
  font-weight: bold;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 370px;
  text-align: center;
  border-radius: 5px;
  padding: 30px;
  background: #fff;

  img {
    margin-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 0px;
      font-weight: bold;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #999;
      font-weight: bold;
      margin: 0 0 5px;
      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 20px 0 30px;
      height: 45px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.1s;
      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
