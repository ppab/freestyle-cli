## Strings Or Numbers
Se Define Asi:
```ts
const colDef = {
    field: 'displayName',
    editable: true,
}
```

 Sí `editable: true` Resuelve Esto:

```ts
import {EmailCategory} from '../enums/email-category.enum.ts'

const colDef = {
    field: 'displayName',
    valueSetter: [
        'reduxValueSetter2',
        {
            url: 'urls.mutateUrl',
            actionDispatcher: 'actions.updateAction',
            queryParam: 'urls.mutateQueryParam',
        },
    ],
    editable: true,
}
  ```
Sí `editable: false` Resuelve Esto:

```ts
import {EmailCategory} from '../enums/email-category.enum.ts'

const colDef = {
    field: 'displayName',
    editable: false,
}
  ```

## Enums
SE DEFINE ASÍ
```js
const colDef = {
    field: "category",
    type: ['enum', {name: 'EmailCategory', path: '../enums/email-category.enum.ts'}]
}
```

Resuelve Esto
```ts
import {EmailCategory} from '../enums/email-category.enum.ts'
const colDef = {
    field: "category",
    valueSetter: ["reduxValueSetter2", {
        url: "urls.mutateUrl",
        actionDispatcher: "actions.updateAction",
        queryParam: "urls.mutateQueryParam"
    }],
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
        values: Object.keys(EmailCategory),
    },

}

```


## Date
