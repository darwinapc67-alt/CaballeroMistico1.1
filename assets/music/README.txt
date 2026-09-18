Coloca aquí las pistas de música del juego.

Nombres requeridos:
- menu.mp3       Música del menú principal.
- normal.mp3     Música de aventura y exploración normal.
- tienda.mp3     Música tranquila de la tienda y el armario.
- jefe.mp3       Música de tensión para las salas de jefe.
- gameplay.mp3   Alias opcional de la música normal.
- boss.mp3       Alias opcional de la música de jefes.
- infinite.mp3   Música del modo infinito.

Si todavía no se han añadido los MP3, el juego usa una melodía de respaldo
generada con Web Audio después de la primera interacción del jugador.
Para sustituirla, copia pistas MP3 u OGG con loop limpio y licencia válida.

Para añadir una pista:
1. Copia el archivo en esta carpeta.
2. Añade su ruta al objeto MUSIC_TRACKS en js/audio.js.
3. Incluye la pista en getMusicTrackForState() cuando corresponda.
