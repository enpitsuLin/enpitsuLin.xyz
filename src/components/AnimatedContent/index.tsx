import styled from 'styled-components';

interface Props {
  /** @todo use props control animate's prototypes */
}

const AnimatedContent = styled.div<Props>`
  @keyframes routeChange {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: routeChange;
`;

export default AnimatedContent;
