import {createFileWithCtx} from "../commands/createFileWithCtx.command";


function initTask(ctx) {
    type taskType = {
        name: string;
        args: {
            contentDestination: PathDefinitionType
            templateSource: PathDefinitionType
        }
    }
    const task: taskType[] = [
        {
            name: 'CreateFileWithCtx',
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
            name: 'CreateFileWithCtx',
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
            name: 'CreateFileWithCtx',
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
            name: 'CreateFileWithCtx',
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

    task.forEach((item) => {
        createFileWithCtx({
            contentDestination: item.args.contentDestination,
            templateSource: item.args.templateSource,
            ctx,
        })
    })

}

initTask({FRONT_END: 'react', BACK_END: 'nestjs'})