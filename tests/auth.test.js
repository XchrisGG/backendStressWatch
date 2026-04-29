// tests/auth.test.js
import { jest } from '@jest/globals';

// Una prueba simple para verificar que Jest funciona con tus módulos
describe('Pruebas de Lógica de Autenticación', () => {
  test('Validación de formato de correo', () => {
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = "test@ejemplo.com";
    
    expect(emailRegexp.test(emailValido)).toBe(true);
  });

  test('Simulación de encriptación de password', () => {
    const pass = "123456";
    // Solo verificamos que la variable exista y no esté vacía
    expect(pass).toBeDefined();
    expect(pass.length).toBeGreaterThan(5);
  });
});