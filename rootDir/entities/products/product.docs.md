```ts
interface Product {
    productCategory: ProductCategory;
    name: string;
    description: string;
    productCode: string;
    generateProductCode: () => {};
}
```

```ts
import {ProductCategory} from "./product-category.enum";
class CreateProductDto {
    @IsEnum(ProductCategory)
    productCategory: ProductCategory;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsValidProductCode()//TODO: Custom Decorator @IsValidProductCode
    @IsString()
    productCode: string;
}
```

```ts
const createForm = [
    {
        name: 'address',
        component: 'EnumList',
    },
    {
        name: 'address',
        component: 'InputField',
    },
    {
        name: 'description',
        component: 'InputField',
    },
    {
        name: 'productCode',
        component: 'CustomProductCodeComponent',
    }
]

```

## Generación del `producCode`

* El primer caracter de las 2 palabras  (2 iniciales), *****Lechuga Romana->LE
* si es una palabra los primeros dos caracteres, ******Brocoli->Br
* sí ya existe ese productCode tendríamos que mostrar el error para que el usuario de de alta el código
* generate request to server to identify if name exisit, if it does, show the product name that was found with that code