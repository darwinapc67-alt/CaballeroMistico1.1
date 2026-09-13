# Asistente inteligente

El asistente usa OpenAI desde un servidor local. La clave nunca se coloca en `index.html` ni en los archivos JavaScript.

## Iniciar

Requiere Node.js 18 o superior:

```powershell
$env:OPENAI_API_KEY="tu_clave"
node assistant-server.js
```

Después abre la partida normalmente y presiona `/`.

Si quieres cambiar el modelo:

```powershell
$env:OPENAI_MODEL="gpt-4o-mini"
```
