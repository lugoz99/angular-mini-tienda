/**
 * Gestor de cache genérico con expiración automática
 * Reutilizable en cualquier servicio
 */
export class CacheManager<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private readonly duration: number;

  /**
   * @param durationMs Duración del cache en milisegundos (default: 5 minutos)
   */
  constructor(durationMs: number = 5 * 60 * 1000) {
    this.duration = durationMs;
  }

  /**
   * Obtiene un valor del cache si está disponible y no ha expirado
   */
  get(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.duration) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Guarda un valor en el cache con timestamp actual
   */
  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Limpia todo el cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Verifica si una clave existe en el cache y no ha expirado
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Elimina una entrada específica del cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Obtiene el número de entradas en el cache
   */
  size(): number {
    return this.cache.size;
  }
}
