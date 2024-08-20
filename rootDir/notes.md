we can have a default object for each page.


```js
// frontEnd createForm
const obj = {
    create: {
        dto: {
            name: "CreateEmailDto",
            path: "./dto/create-email.dto",
        },
        enums: [
            {
                name: 'EmailCategory',
                path: './enums/email-category.enum',
            }
        ],
        formElements: []
    }
}

```

Por ejemplo, para el componente `frontend.component.form.create`,
Primero se ejecuta la acción de todos los argumentos.
se obtiene el resultado que se creo al iterar todos los argumentos.
en este caso responde con dos:
imports,formItems.

cuando se ejecuta el  proceso en el objeto del entity, entonces sí.
se obtienen los datos del objeto del entity, y se incorporan los datos de los argumentos.
`frontend.component.form.create`

