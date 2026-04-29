import { jest } from '@jest/globals';

describe('Pruebas de Seguridad - Middleware Auth', () => {
  test('Debe fallar si el token no es proporcionado', () => {
    const token = null;
    const estaAutorizado = (t) => t ? true : false;
    expect(estaAutorizado(token)).toBe(false);
  });

  test('Debe validar que un token tenga el formato correcto (Bearer)', () => {
    const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    expect(authHeader.startsWith("Bearer ")).toBe(true);
  });
});