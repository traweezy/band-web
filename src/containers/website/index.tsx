import BandLogo from '../../assets/band-logo.png';
import ParticleBackground from 'react-particle-backgrounds';

const settings: ParticleBackgroundConfig = {
  particle: {
    particleCount: 150,
    color: '#e3d5d5',
    maxSize: 2,
  },
  velocity: {
    directionAngle: 180,
    directionAngleVariance: 60,
    minSpeed: 0.1,
    maxSpeed: 0.3,
  },
  opacity: {
    minOpacity: 0,
    maxOpacity: 0.4,
    opacityTransitionTime: 10000,
  },
};

const ContentContainer = ({ children }: any): JSX.Element => (
  <div className="w-full overflow-auto">
    <ParticleBackground className="absolute z-0" settings={settings} />
    <div className="relative w-full">
      <div className="container w-full p-4 mx-auto">
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  </div>
);

const Website = () => (
  <div className="h-screen bg-black font-metal-mania">
    <div className="container px-4 py-16 mx-auto">
      <ContentContainer>
        <img src={BandLogo}></img>
        <h1 className="mt-4 text-5xl font-bold text-center text-white">Coming soon, to a dive bar near you</h1>
      </ContentContainer>
    </div>
  </div>
);

export default Website;
