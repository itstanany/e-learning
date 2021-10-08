/**
 * Offline fallback page to be rendered when user is offline and requested page is not cached
 */
import React from 'react';

function OfflinePage() {
  return (
    <div>
      <h1>You are offline!</h1>
      <h3>When you comeback online, we will save it for offline access</h3>
    </div>
  );
}

export default OfflinePage;
