import styled from "styled-components";

export const Wrapper = styled.div`
  border: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

export const SVGWrapper = styled.svg`
  color: ${({ theme }) => theme.colors.contrastText};
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};

  &:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }

  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }

  @media (max-width: 500px) {
    &:hover .octo-arm {
      animation: none;
    }

    & .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
`;
