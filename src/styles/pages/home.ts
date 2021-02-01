import styled from 'styled-components';

interface BackgroundProps {
  backgroundImage?: string;
}

export const BackgroundImage = styled.main<BackgroundProps>`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center;
  background-size: cover;
  flex: 1;
`;

export const QuizContainer = styled.section`
  margin: auto 10%;
  max-width: 350px;
  padding-top: 45px;
  width: 100%;

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const Widget = styled.aside`
  animation: 1000ms ease-out 0s 1 fadeIn;
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  margin-top: 24px;
  overflow: hidden;

  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
  }
`;

export const WidgetHeader = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: flex-start;
  padding: 18px 32px;

  * {
    margin: 0;
  }
`;

export const WidgetContent = styled.div`
  padding: 24px 32px 32px 32px;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      line-height: 1.8;

      a {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  form {
    margin-top: 22px;

    /* input {
      background-color: ${({ theme }) => theme.colors.mainBg};
      border-radius: ${({ theme }) => theme.borderRadius};
      border: solid 1px ${({ theme }) => theme.colors.inputBorder};
      color: ${({ theme }) => theme.colors.contrastText};
      height: 40px;
      width: 100%;
      padding: 0 16px;

      &::placeholder {
        color: ${({ theme }) => theme.colors.inputText};
      }
    } */

    button {
      appearance: none;
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.contrastText};
      cursor: pointer;
      height: 36px;
      border: 0;
      border-radius: ${({ theme }) => theme.borderRadius};
      transition: background-color 300ms ease;
      margin-top: 24px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        background-color: ${({ theme }) => theme.colors.disabled};
        cursor: not-allowed;
      }
    }
  }
`;

export const WidgetTopic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;
