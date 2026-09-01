# 🎨 Editor de Niveles - Caballero Místico v1.1

## 📋 Descripción General

Se ha implementado un **editor gráfico interactivo completo** para el juego "Caballero Místico". Este editor permite a los usuarios crear, editar, y compartir niveles personalizados de manera intuitiva.

---

## ✨ Características Destacadas

### 🎯 Interacción Visual
- **Grid visible** (rejilla de 10px) para alineación perfecta
- **HUD informativo** mostrando modo actual, cantidad de elementos, estado del grid
- **Elementos coloreados** según tipo (verde=plataforma, rojo=púa, magenta=enemigo)
- **Panel de controles** en esquina derecha con atajos

### 🔧 Herramientas de Edición
- **Plataformas** (Tecla 1): Superficies sólidas para el jugador
- **Púas** (Tecla 2): Zonas dañinas que causan daño
- **Enemigos** (Tecla 3): Coloca murciélagos y criaturas
- **Borrar** (Tecla X): Elimina elementos seleccionados

### 🎮 Controles Intuitivos
```
Click Izquierdo   → Agregar elemento / Seleccionar y mover
Click Derecho     → Redimensionar elemento
Arrastrar         → Posicionar elementos con precisión
Teclas 1, 2, 3, X → Cambiar herramienta
G                 → Mostrar/Ocultar Grid
T                 → Snap a Grid (magnetismo de alineación)
S                 → Guardar nivel
C                 → Copiar JSON al portapapeles
ESC               → Salir del editor
```

### 💾 Sistema de Guardado
- **LocalStorage**: Niveles guardados automáticamente en el navegador
- **Nombres personalizados**: Cada nivel tiene un nombre descriptivo
- **JSON exportable**: Comparte niveles en formato JSON
- **Carga/Eliminación**: Gestiona tus niveles guardados

---

## 🚀 Cómo Empezar

### 1. Abrir el Editor
```
Menú Principal → Selecciona "EDITOR DE NIVELES" → Enter
```

### 2. Crear un Nivel Simple
```
1. Presiona "1" para modo Plataforma
2. Haz clic izquierdo en el canvas para agregar plataformas
3. Presiona "2" para modo Púa
4. Agrega púas en zonas peligrosas
5. Presiona "S" para guardar tu nivel
6. Ingresa un nombre y ¡listo!
```

### 3. Compartir tu Nivel
```
1. Presiona "C" para copiar el JSON
2. Comparte el JSON con otros jugadores
3. Ellos pueden importarlo en futuras versiones
```

---

## 📐 Sistema de Grid y Snap

### Grid (Tecla G)
- Muestra una rejilla de 10x10 píxeles
- Ayuda a alinear elementos visualmente
- Se puede ocultar para vista más clara

### Snap to Grid (Tecla T)
- Alinea automáticamente los elementos a la rejilla
- Útil para diseños ordenados y simétricos
- Se puede desactivar para libertad total de posicionamiento

### Ejemplo de Uso:
```
1. Presiona "G" para activar grid
2. Presiona "T" para activar snap
3. Agrega elementos - se alinearán automáticamente
4. Resultado: Nivel perfectamente alineado
```

---

## 🎯 Ejemplos Prácticos

### Nivel Básico: Plataformas Ascendentes
```
1. Modo Plataforma (1)
2. Agrega 5 plataformas en escalera ascendente
3. Cada plataforma 50px más alta que la anterior
4. Modo Enemigo (3): Agrega enemigos al final
5. Guarda como "Escalera Desafiante"
```

### Nivel Intermedio: Pasillo Peligroso
```
1. Modo Púa (2): Crea zona de púas
2. Modo Plataforma (1): Agrega camino seguro estrecho
3. Modo Enemigo (3): Enemigos flanqueando
4. Resultado: Corredor peligroso que requiere precisión
5. Guarda como "Pasillo de la Muerte"
```

### Nivel Avanzado: Laberinto de Saltos
```
1. Diseña un patrón de plataformas tipo laberinto
2. Coloca púas en "callejones sin salida"
3. Enemigos patrullando
4. Múltiples caminos hacia la salida
5. Guarda como "Laberinto Místico"
```

---

## 📊 Información Técnica

### Archivos Modificados
- **js/config.js** (+120 líneas): Variables y lógica del editor
- **js/input.js** (+50 líneas): Manejo de eventos de mouse y teclado
- **js/main.js** (+1 línea): Inicialización del editor
- **js/render.js** (+120 líneas): Interfaz gráfica del editor

### Arquitectura del Editor
```
┌─────────────────────────────────────┐
│   drawEditorUI() en render.js        │
├─────────────────────────────────────┤
│  - Grid visual                      │
│  - Elementos coloreados             │
│  - Panel HUD                        │
│  - Cursor del editor                │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Event Listeners en input.js         │
├─────────────────────────────────────┤
│  - mousemove                        │
│  - mousedown                        │
│  - mouseup                          │
│  - keydown (1,2,3,X,G,T,S,C,ESC)    │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Funciones en config.js              │
├─────────────────────────────────────┤
│  - handleEditorMouseDown()          │
│  - handleEditorMouseMove()          │
│  - handleEditorMouseUp()            │
│  - snapToGrid()                     │
│  - getElementAtMouse()              │
│  - saveLevelFromEditor()            │
│  - copyLevelToClipboard()           │
└─────────────────────────────────────┘
```

### Variables Principales
```javascript
editorSelection = 0;        // 0: plat, 1: púa, 2: enemigo, 3: borrar
editorElements = [];        // Array de elementos del nivel
editorSelectedElement = -1; // Índice del elemento seleccionado
editorGridSize = 10;        // Tamaño del grid en píxeles
editorShowGrid = true;      // Visibilidad del grid
editorSnapToGrid = true;    // Magnetismo de alineación
```

---

## 🐛 Resolución de Problemas

### P: No aparece el grid
**R:** Presiona `G` para activar/desactivar. Si está desactivado, presiona `G` para activarlo.

### P: Los elementos no se mueven bien
**R:** Asegúrate de hacer click en el elemento primero para seleccionarlo.

### P: No puedo redimensionar
**R:** Necesitas hacer click **derecho** en la **esquina inferior derecha** del elemento.

### P: El JSON no se copia
**R:** Algunos navegadores requieren permisos. Comprueba la consola (F12) para mensajes de error.

### P: Los niveles desaparecieron
**R:** Si limpiastes el caché del navegador, se pierden los datos. Siempre copia el JSON para respaldo.

---

## 📚 Documentación Adicional

- **[EDITOR_GUIDE.md](EDITOR_GUIDE.md)** - Guía completa del usuario
- **[EJEMPLOS_EDITOR.md](EJEMPLOS_EDITOR.md)** - Ejemplos de uso avanzado
- **[CAMBIOS_EDITOR.md](CAMBIOS_EDITOR.md)** - Detalles técnicos de implementación

---

## 🎓 Consejos de Diseño

### ✅ Buenas Prácticas
- Siempre activa el grid para alineación consistente
- Prueba tu nivel después de guardarlo
- Usa nombres descriptivos para tus niveles
- Haz respaldos en JSON de tus obras maestras
- Comienza simple y ve aumentando la complejidad

### ⚠️ Cosas a Evitar
- No hagas plataformas muy pequeñas (<20px)
- No pongas púas en lugares imposibles de evitar
- No saturees el nivel con enemigos (máx 10 recomendado)
- No ignores la física del juego

### 🎯 Técnicas Avanzadas
- Combina púas y saltos para desafíos
- Usa enemigos para forzar rutas específicas
- Crea "falsas soluciones" (caminos que parecen seguros)
- Prueba tu nivel frecuentemente durante la edición

---

## 🔮 Características Futuras (Roadmap)

### Próximas Mejoras:
- [ ] Selector visual de tipo de enemigo
- [ ] Sistema deshacer/rehacer (Ctrl+Z/Ctrl+Y)
- [ ] Importador de JSON personalizado
- [ ] Previsualización con física en tiempo real
- [ ] Validación automática de nivel
- [ ] Herramienta de copiar/pegar elementos
- [ ] Presets de plataformas comunes
- [ ] Generador de niveles aleatorios

---

## 📞 Soporte

### ¿Encontraste un bug?
1. Presiona `C` para copiar el JSON del nivel
2. Anota los pasos exactos para reproducir el problema
3. Comparte con el desarrollador

### ¿Tienes sugerencias?
- Las sugerencias de nuevas características son bienvenidas
- Comparte ejemplos de niveles interesantes
- Feedback sobre usabilidad del editor

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de código nuevo | ~290 |
| Funciones nuevas | 8 |
| Características nuevas | 15+ |
| Teclas de atajo | 10 |
| Archivos modificados | 4 |
| Archivos de documentación | 3 |
| Tiempo de desarrollo | 2 sesiones |
| Estado | ✅ Production Ready |

---

## 🎮 Características Principales del Juego

- **Plataformas**: Superficies donde caminar y saltar
- **Púas**: Trampas dañinas
- **Enemigos**: Criaturas que persiguen
- **Saltos**: Mecánica principal de movimiento
- **Vida**: Sistema de salud del jugador

---

## 📝 Licencia y Créditos

**Caballero Místico** - Juego creado en JavaScript/Canvas
**Editor de Niveles** - Mejora implementada para facilitar creación de contenido

---

## 🎉 ¡Bienvenido al Editor!

¡Ahora puedes crear tus propios niveles! El editor está completo y listo para usar.

**Comienza creando tu primer nivel ahora mismo:**
1. Abre el juego
2. Selecciona "EDITOR DE NIVELES" en el menú
3. ¡Diseña tu obra maestra!

---

**Versión**: 1.0  
**Última actualización**: 2025-01-15  
**Estado**: ✅ Completo y Funcional
