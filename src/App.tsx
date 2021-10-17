import { memo } from 'react';
import Placeholder from './assets/placeholder.gif';

const App = () => (
  <div className="flex items-center w-full h-full">
    <div className="mx-auto text-center">
      <div className="mb-10 text-6xl">[Name Redacted]</div>
      <div className="mb-5 text-4xl">under construction</div>
      <div>
        <img className="md:rounded-md" src={Placeholder} alt="placeholder" />
      </div>
    </div>
  </div>
);

export default memo(App);
