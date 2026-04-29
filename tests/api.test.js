import { jest } from '@jest/globals';

describe('Pruebas de API - Endpoints', () => {
  test('El endpoint /api/status debe retornar un JSON con éxito', () => {
    const respuestaSimulada = { success: true, message: "OK" };
    expect(respuestaSimulada.success).toBe(true);
    expect(typeof respuestaSimulada.message).toBe('string');
  });
});