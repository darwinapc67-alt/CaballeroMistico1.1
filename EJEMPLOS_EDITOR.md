# 📚 Ejemplos de Uso del Editor de Niveles

## Ejemplo 1: Crear un Nivel Básico

### Paso a Paso:
1. **Abre el editor**: Menú Principal → "EDITOR DE NIVELES"
2. **Modo Plataforma** (presiona `1`)
3. **Agrega plataforma base**: Click izquierdo en la parte inferior
4. **Agrega plataforma intermedia**: Click izquierdo en el medio
5. **Agrega púas** (presiona `2`)
6. **Click derecho para redimensionar**: Haz las púas más largas
7. **Agrega enemigos** (presiona `3`)
8. **Guarda** (presiona `S`) → Ingresa nombre: "Mi Primer Nivel"

### Resultado:
Un nivel simple con plataformas, púas y enemigos.

---

## Ejemplo 2: Usar Grid para Alineación Perfecta

### Paso a Paso:
1. Presiona `G` para activar el grid (si está desactivado)
2. Presiona `T` para activar Snap to Grid
3. Agrega plataformas (click izquierdo)
4. Notarás que se alinean automáticamente cada 10 píxeles
5. Las púas y enemigos también se alinean perfectamente

### Ventaja:
- Menos tiempo ajustando posiciones
- Niveles más ordenados visualmente
- Mejor para diseños geométricos

---

## Ejemplo 3: Redimensionar Elementos

### Para agrandar una púa:
1. Click izquierdo en la púa (la selecciona)
2. Click derecho en la esquina inferior derecha (manija)
3. Arrastra hacia abajo-derecha para agrandar
4. Arrastra hacia arriba-izquierda para empequeñecer

### Para una plataforma ancha:
1. Crea plataforma con click izquierdo
2. Selecciona y arrastra manija hacia la derecha
3. Ahora los jugadores pueden pararse en una superficie mayor

---

## Ejemplo 4: Diseño de Trampa

### Crear una zona de púas peligrosa:
1. Modo púa (`2`)
2. Presiona `G` para ocultar grid (vista más clara)
3. Dibuja múltiples púas en línea
4. Redimensiona cada una para que se conecten
5. Resultado: Zona de púas continua y peligrosa

### Exportar la configuración:
```bash
Presiona C → JSON copiado al portapapeles
Puedes compartir este JSON con otros
```

---

## Ejemplo 5: Cargar un Nivel Guardado

### Desde el menú del editor:
1. Presiona ESC para salir del editor
2. Abre el editor nuevamente (desde el menú)
3. Selecciona "Cargar nivel"
4. Elige un nivel de la lista
5. ¡Editarlo nuevamente!

---

## Ejemplo 6: Copiar y Compartir JSON

### Estructura del JSON exportado:
```json
{
  "roomIndex": 0,
  "roomName": "CAVERNA INICIAL",
  "height": 600,
  "platforms": [
    {"x": 0, "y": 560, "w": 100, "h": 20},
    {"x": 150, "y": 480, "w": 100, "h": 20}
  ],
  "spikes": [
    {"x": 200, "y": 550, "w": 100, "h": 20}
  ],
  "enemies": [
    {"x": 200, "y": 350, "type": "bat", "w": 24, "h": 20}
  ]
}
```

### Para usar:
1. Copia este JSON
2. Guárdalo en un archivo `.json`
3. Comparte con otros jugadores
4. Ellos pueden importarlo (próximamente)

---

## Ejemplo 7: Diseño de Saltos Progresivos

### Crear un nivel de dificultad creciente:

1. **Primeros saltos** (cortos):
   - Modo plataforma (`1`)
   - Crea 3 plataformas pequeñas separadas 80px

2. **Saltos medios**:
   - Agrega 3 plataformas más pequeñas
   - Aumenta la separación a 120px

3. **Saltos difíciles**:
   - Agrega 2 plataformas muy separadas (150px)
   - Coloca púas debajo para motivar saltos perfectos

4. **Enemigos**:
   - Modo enemigo (`3`)
   - Agrega murciélagos cerca de las zonas difíciles
   - Presiona `S` para guardar

### Resultado:
Nivel con dificultad progresiva y desafío

---

## Ejemplo 8: Nivel con Zona de Transición

### Crear un pasillo peligroso:
1. Crea una plataforma larga (ancho 150, alto 30)
2. Llena con púas encima
3. Agrega enemigos a ambos lados
4. La zona de transición se ubicará al final
5. Guarda como "Pasillo de la Muerte"

---

## Ejemplo 9: Optimizar Vista

### Desactivar elementos para vista clara:
1. Presiona `G` para ocultar grid (menos visual clutter)
2. Presiona `T` para desactivar snap (libertad total de posicionamiento)
3. Ahora ves el nivel limpio sin guías

### Volver a modo preciso:
1. Presiona `G` para mostrar grid
2. Presiona `T` para activar snap
3. Ahora puedes alinear elementos perfectamente

---

## Ejemplo 10: Exportar para Respaldo

### Crear respaldo de tu nivel:
1. Presiona `C` para copiar JSON
2. Pega en un editor de texto (Notepad++)
3. Guarda como `mi_nivel_backup.json`
4. Copia el archivo a nube (Google Drive, etc.)
5. Si algo se corrompe, puedes restaurar

---

## Consejos Prácticos

### ✅ Buenas Prácticas:
- Siempre prueba tu nivel después de guardar
- Usa grid para alineación consistente
- Nombra niveles descriptivamente
- Haz respaldos en JSON regularmente
- Comienza simple y ve aumentando complejidad

### ⚠️ Cosas a Evitar:
- No hagas plataformas demasiado pequeñas (<20px)
- No pongas púas en lugares imposibles de evitar
- No saturees el nivel con enemigos
- No ignores la física (prueba saltando)

### 🎯 Técnicas Avanzadas:
- Combina púas y saltos para desafíos
- Usa enemigos para forzar rutas específicas
- Crea "falsas soluciones" (caminos que parecen seguros)
- Diseña acorde a la habilidad del jugador

---

## Comandos Rápidos (Cheatsheet)

| Acción | Tecla | Descripción |
|--------|-------|-------------|
| Plataforma | 1 | Cambiar a modo plataforma |
| Púa | 2 | Cambiar a modo púa |
| Enemigo | 3 | Cambiar a modo enemigo |
| Borrar | X | Activar modo borrar |
| Grid | G | Mostrar/ocultar rejilla |
| Snap | T | Activar/desactivar magnetismo |
| Guardar | S | Guardar nivel con nombre |
| Copiar | C | Copiar JSON al portapapeles |
| Salir | ESC | Abandonar editor |
| Mover | Clic Izq | Arrastrar elemento seleccionado |
| Redimensionar | Clic Der | Ajustar tamaño de elemento |

---

## Resolución de Problemas

### P: El elemento no se mueve
**R:** Asegúrate de hacer click en el elemento (debe estar seleccionado)

### P: No puedo redimensionar
**R:** Necesitas hacer click derecho en la esquina inferior derecha del elemento

### P: El grid es confuso
**R:** Presiona `G` para ocultarlo mientras editas

### P: Los elementos no se alinean
**R:** Presiona `T` para activar Snap to Grid

### P: Perdí mi nivel
**R:** Los niveles se guardan automáticamente en LocalStorage
- Si limpias el caché del navegador, se pierden
- Siempre copia el JSON para respaldo

### P: ¿Puedo editar enemigos?
**R:** Actualmente solo aparecen como murciélagos
- Próxima actualización permitirá seleccionar tipo

---

## Próximas Características (Roadmap)

🔜 **Próximamente en el Editor:**
- [ ] Selector de tipo de enemigo
- [ ] Deshacer/Rehacer (Ctrl+Z)
- [ ] Duplicar elementos
- [ ] Importar JSON personalizado
- [ ] Previsualización con física
- [ ] Validación de nivel
- [ ] Generador de niveles aleatorios

---

## Soporte y Feedback

¿Encontraste un bug o tienes sugerencias?
- Presiona `C` para copiar el nivel en JSON
- Comparte el JSON con el desarrollador
- Describe qué sucedió y qué esperabas

---

**¡Diviértete diseñando niveles! 🎮**
