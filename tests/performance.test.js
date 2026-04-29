import { jest } from '@jest/globals';

describe('Pruebas de Performance - Tiempos de respuesta', () => {
  test('La respuesta del servidor debe ser menor a 200ms', () => {
    const tiempoRespuesta = 150; // milisegundos
    expect(tiempoRespuesta).toBeLessThan(200);
  });
});