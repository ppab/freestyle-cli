# GOAL 1. Create my own library that has CI/CD  that publishes to NPM
- It must have specs for all fns
- As a habit, when you want to create new work you setup your TS environment
 and  do TDD and use the debugger also.
 - create factories for function arguments, in this way we can controll the way fn or class arguments are created, it will speed our dev process.
 - instead of debugging using console.log() you must learn how to use the debbugger and write a test straight away

 ```bash
 freestyle create --name='my-fn' --type='class|fn'
 ## this wil create a file with its test file and its factory
 ```


!!!! Start creating new resources with  freestyle.


# Factories:
1. typeormKeysFactory
 - review the configs in goldfieldGateway conf and create a factory for each configuration case

2. classValidatorDtoFactory
 - review the configs in goldfieldGateway conf and create a factory for each configuration case
 
3. createFormFactory
 - review the configs in templateReact conf and create a factory for each configuration case
