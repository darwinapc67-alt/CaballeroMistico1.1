# Historial de versiones

Se conserva `v2.75` como versión histórica de partida. Los cambios ya aplicados
en el árbol de trabajo se contabilizan una sola vez por cambio funcional, no por
archivo.

| Versión anterior | Versión nueva | Cambio | Motivo |
| --- | --- | --- | --- |
| v2.75 | v2.76 | Composición musical de respaldo ampliada y caché de audio actualizada. | Mejora funcional de la música y corrección de carga de la versión nueva del audio. |
| v2.76 | v2.77 | Retirado el coleccionable oculto Eclipse y migrado su bonificador de partidas antiguas. | Elimina su aparición, recogida y +10 de vida sin alterar otras mejoras. |
| v2.77 | v2.78 | Añadido versionado persistente independiente de las partidas. | Nueva función para mostrar y conservar la versión del juego. |
| v2.78 | v2.79 | Retirado el coleccionable oculto de la habitación 7 (ID 6). | Elimina su aparición y recogida según la solicitud. |
| v2.79 | v2.80 | Corregido el orden de dibujo de fondos y decoraciones entre habitaciones. | Evita que el fondo de la habitación siguiente tape elementos que continúan sobre el límite. |
| v2.80 | v2.81 | Añadidas capas de relieve rocoso y detalles ambientales regionales. | Aporta profundidad y variedad a los fondos manteniendo visibilidad y continuidad. |
| v2.81 | v2.82 | El altar de la habitación 14 ahora entrega espada y escudo; se retiró la recompensa independiente de la habitación 19. | Unifica la obtención de ambas armas y migra partidas normales existentes que ya tenían espada. |
| v2.82 | v2.83 | Retirados los pinchos de la habitación 16 y sustituidos los títulos genéricos repetidos por los identificadores de habitación existentes. | Evita un tramo innecesariamente tedioso y distingue las habitaciones del Paso de las Profundidades sin inventar nombres. |
| v2.83 | v2.84 | Bloqueado el wall-jump hasta que exista un desbloqueo oficial. | Evita usar una habilidad que todavía no está implementada, sin alterar los saltos normal ni doble. |
| v2.84 | v2.85 | Evitadas reproducciones musicales duplicadas al cambiar de pista y al resolver callbacks de reproducción obsoletos. | Garantiza una única reproducción por fuente y descarta errores asíncronos de solicitudes anteriores. |
| v2.85 | v2.86 | Añadida música ambiental instrumental propia para el selector de partidas. | Acompaña la selección de ranuras con un arreglo sereno y diferenciado, respetando los fundidos y la opción de música. |
| v2.86 | v2.87 | Añadidos identificadores temporales H1–H25 a las habitaciones de Ardoris. | Facilita la identificación visual de las salas para organizar el diseño del mapa sin modificar sus IDs ni conexiones. |
| v2.87 | v2.88 | Reorganizadas las conexiones y la distribución del mapa de Ardoris. | Adapta las rutas a la distribución H1–H25, conservando los IDs, las barreras de progresión y el acceso a la tienda y Brumalis. |
| v2.88 | v2.89 | Añadidos pasajes físicos visibles a las conexiones de Ardoris. | Las transiciones ahora se activan al cruzar la abertura correspondiente y conservan sus requisitos de progresión. |

La versión activa se define en `js/config/gameConfig.js` y se guarda con la
clave independiente `caballero_mistico_version` de `localStorage`. Crear una
partida o borrar una ranura no modifica esa clave.
