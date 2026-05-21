# NgTestoShop

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

# Librerias

- TAILWIND
- DAISY UI

# Store-Front

- feature module -> 404 , layout, components

# Paginación

limit = número de registro por página
offset = desde donde se empieza
ejemplo
total = 52 productos
52 / 9 = 5.77 → 6 páginas -> 1-9 -> 9 - 18

## Query Params con `withComponentInputBinding()`

Angular vincula automáticamente los query params a los inputs del componente por **nombre exacto**:

```typescript
// URL: ?page=2
page = input(1); // ✅ Angular vincula automáticamente
```

**Flujo:**

1. Click en página 2 → URL: `?page=2`
2. `withComponentInputBinding()` detecta el cambio
3. Input `page` se actualiza automáticamente
4. `rxResource` se reactiva → nueva petición

**Regla:** El nombre del input debe coincidir con el query param.

# Carrousel

- https://swiperjs.com/

# futuro

- tanckstack query

# [routerLink]="[]" -> “No cambies la URL base, solo modifica opciones de navegación”.

# merge -> “mezcla los query params actuales con los nuevos”.
