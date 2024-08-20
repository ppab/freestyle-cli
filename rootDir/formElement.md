## Strings Or Numbers


## ENUMS
Definition:
```ts
const formElement = {
    type: ['enum', {name: 'EmailCategory', path: '../enums/email-category.enum.ts'}],
    name: 'category',
    value: 'category',
    label: 'caegoria correo',
    description: "this is a description"
}
```
Resolves To
```ts
import {EmailCategory} from '../enums/email-category.enum.ts'

const formElement = {
    type: 'enum',
    name: 'category',
    value: 'category',
    label: 'caegoria correo',
    description: "this is a description",
    component: 'select',
    props: {
        options: EmailCategory
    },
}
```


## DATE

