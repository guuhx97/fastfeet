import { darken } from 'polished';
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #666;
`;

export const Container = styled.div`
  width: 70%;
  margin: 50px auto;

  ul {
    list-style: none;

    section {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 40px;
      padding: 0 20px;
      margin-bottom: 5px;

      h1 {
        font-size: 15px;
        font-weight: bold;
        color: #666;
      }
    }

    li {
      padding: 0 15px;
      align-items: center;
      margin-bottom: 15px;
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 40px;
      height: 64px;
      background: #fff;

      span {
        font-size: 14px;
        color: #666;
      }

      button {
        border: none;
        margin-left: 5px;
        background: #fff;
        div {
          display: flex;
          align-items: center;
          a svg {
            margin-right: 1px;
          }
        }
      }
    }
  }
`;

export const Tools = styled.div`
  width: 100%;
  margin: 50px auto 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  aside {
    display: flex;
    align-items: center;
    border: 1px #ddd solid;
    background: #fff;
    border-radius: 5px;
    width: 250px;
    padding: 0px 10px;

    div {
      display: flex;
      align-items: center;
      svg {
        margin-right: 1px;
      }
    }
    input {
      padding: 5px;
      border: none;
      color: #333;
    }
  }

  button {
    display: flex;
    align-items: center;
    height: 36px;
    background: #7d40e7;
    padding-right: 12px;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: background 0.1s;

    &:hover {
      background: ${darken(0.05, '#7d40e7')};
    }

    div {
      display: flex;
      align-items: center;
      padding: 10px;
      svg {
        margin-right: 1px;
      }
    }
    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
  }
`;
