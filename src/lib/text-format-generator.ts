type TextFormats = {
    ORIGINAL: string;
    UPPER_SNAKE_CASE: string;
    LOWER_SNAKE_CASE: string;
    KEBAB_CASE: string;
    TITLE_CASE: string;
    CAPITALIZED: string;
    LOWERCASE: string;
    PASCAL_CASE: string;
    CAMEL_CASE: string;
    UPPERCASE: string;
};
export type EntityNameFormats = {
    ORIGINAL_ENTITY: string;
    UPPER_SNAKE_CASE_ENTITY: string;
    LOWER_SNAKE_CASE_ENTITY: string;
    KEBAB_CASE_ENTITY: string;
    TITLE_CASE_ENTITY: string;
    CAPITALIZE_ENTITY: string;
    LOWERCASE_ENTITY: string;
    PASCAL_CASE_ENTITY: string;
    CAMEL_CASE_ENTITY: string;
    UPPERCASE_ENTITY: string;

    ORIGINAL_ENTITY_PLURAL: string;
    UPPER_SNAKE_CASE_ENTITY_PLURAL: string;
    LOWER_SNAKE_CASE_ENTITY_PLURAL: string;
    KEBAB_CASE_ENTITY_PLURAL: string;
    TITLE_CASE_ENTITY_PLURAL: string;
    CAPITALIZED_ENTITY_PLURAL: string;
    LOWERCASE_ENTITY_PLURAL: string;
    PASCAL_CASE_ENTITY_PLURAL: string;
    CAMEL_CASE_ENTITY_PLURAL: string;
    UPPERCASE_ENTITY_PLURAL: string;
};

export class TextFormatGenerator {
    private original: string;

    constructor(initialValue: string) {
        this.original = initialValue;
    }

    private toUpperSnakeCase(text: string): string {
        return text.toUpperCase().replace(/\s+/g, '_');
    }

    private toLowerSnakeCase(text: string): string {
        return text.toLowerCase().replace(/\s+/g, '_');
    }

    private toKebabCase(text: string): string {
        return text.toLowerCase().replace(/\s+/g, '-');
    }

    private toTitleCase(text: string): string {
        return text.replace(
            /\w\S*/g,
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        );
    }

    private toCapitalized(text: string): string {
        return text.toUpperCase().replace(/\s+/g, ' ');
    }

    private toLowercase(text: string): string {
        return text.toLowerCase();
    }

    private toPascalCase(text: string): string {
        return text
            .replace(
                /\w\S*/g,
                (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .replace(/\s+/g, '');
    }

    private toCamelCase(text: string): string {
        const pascalCase = this.toPascalCase(text);
        return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
    }

    private toUppercase(text: string): string {
        return text.toUpperCase();
    }

    public generateFormats(): TextFormats {
        return {
            ORIGINAL: this.original,
            UPPER_SNAKE_CASE: this.toUpperSnakeCase(this.original),
            LOWER_SNAKE_CASE: this.toLowerSnakeCase(this.original),
            KEBAB_CASE: this.toKebabCase(this.original),
            TITLE_CASE: this.toTitleCase(this.original),
            CAPITALIZED: this.toCapitalized(this.original),
            LOWERCASE: this.toLowercase(this.original),
            PASCAL_CASE: this.toPascalCase(this.original),
            CAMEL_CASE: this.toCamelCase(this.original),
            UPPERCASE: this.toUppercase(this.original),
        };
    }

    static ToWords(str) {
        return str
            .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase in camelCase
            .trim()
            .toLowerCase();
    }

    static FromPascalCase(value) {
        function pascalCaseToWords(str) {
            return str
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .toLowerCase();
        }

        return new TextFormatGenerator(pascalCaseToWords(value)).generateFormats();
    }

    static FromSnakeCase(value) {
        function snakeCaseToWords(str) {
            return str.replace(/_/g, ' ').toLowerCase();
        }

        return new TextFormatGenerator(snakeCaseToWords(value)).generateFormats();
    }

    static FromKebabCase(value) {
        function kebabCaseToWords(str) {
            return str.replace(/-/g, ' ').toLowerCase();
        }

        return new TextFormatGenerator(kebabCaseToWords(value)).generateFormats();
    }

    static FromCamelCase(value) {
        function camelCaseToWords(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        }

        return new TextFormatGenerator(camelCaseToWords(value)).generateFormats();
    }

    public reset(newValue: string): void {
        this.original = newValue;
    }
}

// // Usage example:
// const textFormatGenerator = new TextFormatGenerator('product category');
// console.log(textFormatGenerator.generateFormats());
//
// textFormatGenerator.reset('customer purchase order');
// console.log(textFormatGenerator.generateFormats());
