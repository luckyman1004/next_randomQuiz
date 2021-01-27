import styled from 'styled-components';

export const InputWrapper = styled.input`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: solid 1px ${({ theme }) => theme.colors.inputBorder};
  color: ${({ theme }) => theme.colors.contrastText};
  font-size: 14px;
  height: 40px;
  padding: 0 16px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.inputText};
  }
`;
