import { styled } from '@mui/material/styles';

const Background = styled('div')`
  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #67023d, #c60c31, #f61115, #1b1b1b, #512888, #9a54b3);
  background-size: 600% 100%;
  animation: gradient 16s linear infinite;
  animation-direction: alternate;
  position: absolute;
  z-index: -1;
`;

export default Background;
