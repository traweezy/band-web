import BandLogo from '../../assets/band-logo.png';

const Website = () => (
  <div className="h-screen bg-black font-metal-mania">
    <div className="container px-4 py-16 mx-auto">
      <img src={BandLogo}></img>
      <h1 className="mt-4 text-5xl font-bold text-center text-white">
        Coming soo to a dive bar near you
      </h1>
    </div>
  </div>
);

export default Website;
