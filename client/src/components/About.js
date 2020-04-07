import React from 'react';

import '../style/About.scss';

export default () => (
  <div className="About">
    <div className="container">
      <p>
        <strong>nebots</strong> és un portal que permet a les persones poc
        acostumades a la tecnologia fer consultes telefòniques amb voluntaris
        que en saben més.
      </p>
      <p>Per exemple </p>
      <ul>
        <li>Per què han desaparegut els canals de la televisió?</li>
        <li>Què puc provar si no em funciona internet?</li>
        <li>Com envio una foto amb el mòbil?</li>
      </ul>
      <p>
        Els voluntaris que tinguin temps es poden inscriure i rebran una
        notificació quan algú necessiti assistència. Si en aquell moment poden
        atendre la trucada, només han d'obrir la notificació i la trucada els
        serà redirigida.
      </p>
    </div>
  </div>
);
