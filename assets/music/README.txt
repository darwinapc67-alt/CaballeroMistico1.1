Coloca aquí las pistas de música del juego.

Nombres requeridos:
- menu.mp3       Música del menú principal.
- gameplay.mp3   Música de exploración y gameplay normal.
- boss.mp3       Música de combates contra jefes.
- infinite.mp3   Música del modo infinito.

Actualmente el repositorio no incluye archivos de música. El sistema queda
preparado para cargarlos desde esta carpeta. Se recomienda usar MP3 u OGG
con loop limpio y contar con licencia para distribuir cada pista.

Para añadir una pista:
1. Copia el archivo en esta carpeta.
2. Añade su ruta al objeto MUSIC_TRACKS en js/audio.js.
3. Incluye la pista en getMusicTrackForState() cuando corresponda.
