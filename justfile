default:
    echo 'Hello, world!'
test-factory-typeorm-watch:
    npx jest src/factories/backend/typeorm --watch

test-factory-typeorm:
    npx jest src/factory/backend/typeorm 

test-factory-form:
    npx jest src/factory/frontend/components/forms 

test-factory-form-watch:
    npx jest src/factory/frontend/components/forms/*path* --watch

build:
    rm -rf rootDir/dist && ts-node rootDir/processEntitySchema.ts
