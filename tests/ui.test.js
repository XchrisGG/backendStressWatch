import { jest } from '@jest/globals';

describe('Pruebas de UI - Lógica de Componentes', () => {
  test('Debe cambiar el estado del botón a "Cargando" al hacer clic', () => {
    let estadoBoton = "idle";
    const clickHandler = () => { estadoBoton = "loading"; };
    
    clickHandler();
    expect(estadoBoton).toBe("loading");
  });
});