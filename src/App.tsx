import { memo } from 'react';
import Placeholder from './assets/placeholder.gif';

const App = () => (
  <div className="h-full flex items-center w-full">
    <div className="mx-auto">
      <div className="text-4xl text-center">
        [Name Redacted]&apos;s website
        <br />
        under construction
        <img src={Placeholder} alt="placeholder" />
      </div>
    </div>
  </div>
);

export default memo(App);
