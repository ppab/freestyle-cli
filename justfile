default:
    echo 'Hello, world!'
test-factory-typeorm-watch:
    npx jest src/factories/backend/typeorm --watch

test-factory-typeorm:
    npx jest src/factories/backend/typeorm 

test-factory-form:
    npx jest src/factories/frontend/components/forms 

test-factory-form-watch:
    npx jest src/factories/frontend/components/forms --watch
