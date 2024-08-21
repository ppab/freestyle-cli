import { GenericEntityListAndImportsTemplateResolver } from './generic-entity-list-and-imports-template-resolver';

export class FrontendAppModuleListResolver extends GenericEntityListAndImportsTemplateResolver {
  contentDestinationTemplateString: string = `
 import {routeManager} from "../services/managers/route-manager";
import {navigationSchema} from "../services/navigation/navigation.schema";
import {get} from "../Util/get";
{{IMPORTS}}


function addChildren(map, key, newChildren) {
    // Retrieve the current value associated with the key
    const value = map.get(key);
    if (!value) {
        const keys = []
        for (const key of map.keys()) {
            keys.push(key);
        }
        throw Error(\`AppNavigation-> Parent \'\${key}\' not found. \\n Available Keys:[\${keys}]\`);
    }
    if (value && Array.isArray(value.children)) {
        // Push new children into the array
        value.children.push(newChildren);
    }

}

class AppModule {
    constructor(private readonly modules: any[]) {
        this.modules = modules;
        this.init()
    }

    init() {
        console.log("> initializing AppModule ...");

        this.modules.forEach(module => {
            routeManager.set({[module.Schema.name]: module})
            const appNavigation = module.Schema.appNavigation
            appNavigation?.forEach(navigationItem => {
                const children = navigationItem.children
                console.log("moduleSchema", module.Schema)
                console.log("children.href", children.href)
                children.href = get(module.Schema, children.href)
                console.log("navigationItem Children", children)
                addChildren(navigationSchema, navigationItem.parent, children)
            })

            console.log("navigationSchemaInit->", navigationSchema);

        })
        console.log("> modules loaded ...");
    }
}

const appModule = new AppModule([
   {{LIST_ITEMS}}
])

export default appModule


    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/app.module.tsx';
  importStrTemplate = `import {{PASCAL_CASE_ENTITY_PLURAL}}Module from './{{PASCAL_CASE_ENTITY_PLURAL}}/{{PASCAL_CASE_ENTITY_PLURAL}}.module'`;
  listStrTemplate = `{{PASCAL_CASE_ENTITY_PLURAL}}Module`;
}
