import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  animation: 1000ms ease-out 0s 1 fadeIn;
  align-items: center;
  background-color: #00000070;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  padding: 20px;

  img {
    width: 58px;
    margin-right: 23px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
    &:hover,
    &:focus {
      opacity: 0.5;
    }
    span {
      text-decoration: underline;
    }
  }
`;
