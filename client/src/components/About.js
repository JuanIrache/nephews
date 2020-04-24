import React from 'react';

import '../style/Page.scss';

export default () => (
  <div className="Page">
    <div className="container">
      <p>
        <strong>nephews</strong> és un portal que permet a les persones poc
        acostumades a la tecnologia fer consultes telefòniques amb voluntaris
        (nephews) que en saben més.
      </p>
      <p>Per exemple </p>
      <ul>
        <li>Per què han desaparegut els canals de la televisió?</li>
        <li>Què puc fer si no em funciona internet?</li>
        <li>Com envio una foto amb el mòbil?</li>
        <li>M'he de refiar d'aquest email extrany que he rebut?</li>
      </ul>
      <p>
        Els voluntaris que tinguin temps es poden inscriure i rebran una
        notificació quan algú necessiti assistència. Si en aquell moment poden
        atendre la trucada, només han d'obrir la notificació i la trucada els
        serà redirigida al mòbil.
      </p>
      <p>
        No cal instal·lar res ni ser un expert informàtic. Només tenir per la mà
        els aparells habituals de cada dia. És més o menys l'ajuda que ja doneu
        als vostres pares o tietes, però per a gent que no té... nephews.
      </p>
    </div>
  </div>
);
