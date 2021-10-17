import { memo } from 'react';
import Placeholder from './assets/placeholder.gif';

const App = () => (
  <div className="h-full flex items-center w-full">
    <div className="mx-auto text-center">
      <div className="text-6xl mb-10">[Name Redacted]</div>
      <div className="text-4xl mb-5">under construction</div>
      <div>
        <img className="rounded-md" src={Placeholder} alt="placeholder" />
      </div>
    </div>
  </div>
);

export default memo(App);
