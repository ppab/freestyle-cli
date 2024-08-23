## Strings Or Numbers


## ENUMS
Definition:
```ts
const formElement = {
    type: ['enum', {name: 'ProductCategory', path: '../enums/email-category.enum.ts'}],
    name: 'category',
    value: 'category',
    label: 'caegoria correo',
    description: "this is a description"
}
```
Resolves To
```ts
import {ProductCategory} from '../enums/email-category.enum.ts'

const formElement = {
    type: 'enum',
    name: 'category',
    value: 'category',
    label: 'caegoria correo',
    description: "this is a description",
    component: 'select',
    props: {
        options: ProductCategory
    },
}
```


## DATE

