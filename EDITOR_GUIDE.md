# 🎨 Guía del Editor de Niveles - Caballero Místico

## Cómo Acceder al Editor

1. En el menú principal, selecciona **"EDITOR DE NIVELES"** (opción 6)
2. O durante el juego, presiona **`ESC`** para pausar y selecciona **"Ver Diario"** (si está implementado como acceso rápido)

## Controles Principal

### Teclado
- **1**: Seleccionar herramienta "Plataforma"
- **2**: Seleccionar herramienta "Púa" (Pinchos)
- **3**: Seleccionar herramienta "Enemigo"
- **X**: Seleccionar herramienta "Borrar"
- **G**: Mostrar/Ocultar Grid (Rejilla)
- **T**: Activar/Desactivar Snap a Grid (magnetismo a rejilla)
- **S**: Guardar el nivel actual
- **C**: Copiar el nivel en formato JSON al portapapeles
- **ESC**: Salir del editor

### Mouse
- **Click Izquierdo**: 
  - En área vacía: Agregar nuevo elemento
  - En elemento existente: Seleccionar y mover
- **Click Derecho**: 
  - En elemento seleccionado: Redimensionar (arrastra desde esquina inferior derecha)

## Características

### Grid y Snap
- El grid ayuda a alinear elementos
- **Snap to Grid** hace que los elementos se alineen automáticamente a la rejilla
- Tamaño de grid: 10 píxeles (configurable)

### Elementos
- **🟩 Plataforma** (Verde): Superficie sólida donde el jugador puede estar
- **🌹 Púa** (Rojo): Elemento dañino, causa daño al jugador
- **👹 Enemigo** (Magenta): Coloca murciélagos o criaturas enemigas
- **🗑️ Borrar** (Modo especial): Elimina elementos

### Redimensionamiento
1. Selecciona un elemento con click izquierdo
2. Presiona click derecho en la esquina inferior derecha (manija)
3. Arrastra para redimensionar

### Guardado
- **Presiona S** para guardar tu nivel
- Se te pedirá un nombre para el nivel
- Los niveles se guardan en LocalStorage del navegador

### Exportación JSON
- **Presiona C** para copiar el nivel en formato JSON
- Útil para compartir o respaldar niveles
- Formato incluye: plataformas, púas, enemigos y decoración

## Estructura de un Nivel (JSON)

```json
{
  "roomIndex": 0,
  "roomName": "CAVERNA INICIAL",
  "height": 600,
  "platforms": [
    {"x": 100, "y": 500, "w": 150, "h": 20}
  ],
  "spikes": [
    {"x": 300, "y": 550, "w": 200, "h": 20}
  ],
  "enemies": [
    {"x": 150, "y": 350, "w": 24, "h": 20, "type": "bat"}
  ]
}
```

## Tips y Trucos

1. **Comienza con el grid activado** para un alineamiento perfecto
2. **Usa Snap to Grid** para mantener coherencia visual
3. **Copia el JSON** de tu nivel guardado para respaldarlos externamente
4. **Prueba el nivel** en el juego cargando el nivel guardado
5. **Los elementos se heredan** del nivel anterior, así que puedes basarte en niveles existentes

## Limitaciones Conocidas

- Los enemigos se crean como murciélagos básicos por defecto
- No puedes cambiar el tipo de enemigo en el editor (batí, larva, etc.) - pendiente de mejora
- El tamaño máximo del nivel está limitado por el ancho de la sala

## Mejoras Futuras

- [ ] Seleccionar tipo de enemigo
- [ ] Deshacer/Rehacer (Ctrl+Z, Ctrl+Y)
- [ ] Previsualización con física
- [ ] Importar JSON para editar niveles existentes
- [ ] Múltiples capas de elementos
- [ ] Puntos de aparición del jugador personalizables

---

**Versión**: 1.0  
**Última actualización**: 2025-01-15  
**Autor**: Sistema de Editor Mejorado
