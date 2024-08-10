type taskType = {
    name: string;
    args: {
        contentDestination: PathDefinitionType
        templateSource: PathDefinitionType
    }
}
export const init: taskType[] = [
    {
        name: 'createFileWithCtx',
        args: {
            contentDestination: {
                path: './freestyle/global.d.ts'
            },
            templateSource: {
                path: './src/global.d.ts'
            },
        }
    },
    {
        name: 'createFileWithCtx',
        args: {
            contentDestination: {
                path: './freestyle/{{FRONT_END}}-{{BACK_END}}-system-schema.template.ts'
            },
            templateSource: {
                dir: ['./src/templates'],
                fileName: ['{{FRONT_END}}-{{BACK_END}}-system-schema.template.ts'],
            },
        }
    },
    {
        name: 'createFileWithCtx',
        args: {
            contentDestination: {
                path: './freestyle/backend-schemas/nestjs-backend-schema.ts'
            },
            templateSource: {
                dir: ['./src/templates', 'backend-schemas'],
                fileName: ['{{BACK_END}}-backend-schema.ts'],
            },
        },
    },
    {
        name: 'createFileWithCtx',
        args: {
            contentDestination: {
                path: './freestyle/frontend-schemas/react-frontend-schema.ts'
            },
            templateSource: {
                dir: ['./src/templates', 'frontend-schemas'],
                fileName: ['{{FRONT_END}}-frontend-schema.ts'],
            },
        },
    }

]


