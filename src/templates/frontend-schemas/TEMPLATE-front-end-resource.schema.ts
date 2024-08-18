import {formItemFactory} from "../lib/formItem.factory";
import {colDefFieldFactory} from "../lib/colDefField.factory";
import {colDefItemComponentsFactory} from "../lib/colDefItemComponents.factory";
import {urlBuilderFactory} from "../../factories/url-builder.factory";
import {routesFactory, routesGenericFactory} from "../../factories/routes-builder.factory";


const schema = {
        name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
        stateKey: '{{CAMEL_CASE_ENTITY_PLURAL}}',
        arguments: [],
        appNavigation: [
            {
                role: 'fullRole',
                parent: 'Invoices2',
                children: {
                    icon: 'CogIcon',
                    name: 'Contacts',
                    href: 'routes.0.path',
                    current: false,
                },
            },
        ],
        urlBuilder: urlBuilderFactory.setRelations(["addresses"]),
        routes: routesGenericFactory.build(),
        backend: {
            enums: [
                {
                    name: 'AddressCategory',
                    values: ['Primary', 'Secondary'],
                },
            ],
            typeOrm: {
                entityClassDecorator: 'Entity',
                sqlTable: '{{LOWERCASE_SNAKE_CASE_ENTITY_PLURAL}}',
                properties: [
                    "PROPERTIES_BACKEND_TYPEORM_LIST",
                    {
                        decorators: [
                            [
                                'OneToMany',
                                {
                                    args: {
                                        target: 'ContactEntity',
                                        path: '../../contacts/entities/contact.entity',
                                        inverseSideFn: {
                                            arg: 'contact',
                                            returnedValue: 'contact.commercialEntity',
                                        },
                                        options: {
                                            cascade: true,
                                        },
                                    },
                                },
                            ],
                            'JoinColumn',
                        ],
                        key: 'contacts',
                        type: 'ContactEntity[]',
                    },

                ]
            },
        },
        colDef: {
            list: [
                {
                    headerName: 'Id',
                    ...colDefItemComponentsFactory('LinkButton',
                        {
                            routeName: 'Contacts'
                        }
                    )
                },
                "{{PROPERTIES_COMPONENTS_LIST}}",
                // {
                //     field: 'displayName',
                //     valueSetter: [
                //         'reduxValueSetter2',
                //         {
                //             url: 'urls.mutateUrl',
                //             actionDispatcher: 'actions.updateAction',
                //             queryParam: 'urls.mutateQueryParam',
                //         },
                //     ],
                //     editable: true,
                // },
                // {
                //     field: 'description',
                //     valueSetter: [
                //         'reduxValueSetter2',
                //         {
                //             url: 'urls.mutateUrl',
                //             actionDispatcher: 'actions.updateAction',
                //             queryParam: 'urls.mutateQueryParam',
                //         },
                //     ],
                //     editable: true,
                // },
                // {field: 'firstName', editable: false},
                // {field: 'lastName', editable: false},
                // {field: 'email', editable: false},
                {
                    headerName: 'Options',
                    cellRenderer: [
                        'DeleteButton',
                        {url: 'urls.mutateUrl', action: 'actions.deleteAction'},
                    ],
                },
            ],
            item: [
                [
                    // {
                    //     field: 'displayName',
                    //     valueSetter: [
                    //         'reduxValueSetter2',
                    //         {
                    //             url: 'urls.mutateUrl',
                    //             actionDispatcher: 'actions.updateAction',
                    //             queryParam: 'urls.mutateQueryParam',
                    //         },
                    //     ],
                    //     editable: true,
                    // }
                    "{{PROPERTIES_COMPONENTS_ITEM}}"
                ],
                [{field: 'email'}],
            ],
            itemComponents:
                {
                    topBar: {
                        parentComponent: "MyComponentName",
                        colDefs:
                            [
                                "{{PROPERTIES_COMPONENTS_ITEM}}"
                                // {
                                //     field: 'displayName',
                                //     valueSetter: [
                                //         'reduxValueSetter2',
                                //         {
                                //             url: 'urls.mutateUrl',
                                //             actionDispatcher: 'actions.updateAction',
                                //             queryParam: 'urls.mutateQueryParam',
                                //         },
                                //     ],
                                //     editable: true,
                                // },
                            ],
                    }
                    ,
                    middleBar: {
                        parentComponent: "MyComponentName",
                        colDefs:
                            [{field: 'email'}]
                    }
                }
            ,
            componentsLayout: {
                section1: {
                    component: 'MyLayoutComponent1',
                    children:
                        ['itemComponents.topBar'],
                }
                ,
                section2: {
                    component: 'MyLayoutComponent2',
                    children:
                        ['itemComponents.middleBar'],
                }
            }
        },
        form: {
            create: [
                {
                    name: 'firstName',
                    type: 'text',
                    value: 'firstName',
                    label: 'firstName',
                    component: 'InputField',
                },
                {
                    name: 'lastName',
                    type: 'text',
                    value: 'lastName',
                    label: 'lastName',
                    component: 'InputField',
                },
                {
                    name: 'email',
                    type: 'text',
                    value: 'email',
                    label: 'email',
                    component: 'InputField',
                },
                {
                    name: 'jobTitle',
                    type: 'text',
                    value: 'jobTitle',
                    label: 'jobTitle',
                    component: 'InputField',
                },
                {
                    name: 'displayName',
                    type: 'text',
                    value: 'displayName',
                    label: 'displayName',
                    component: 'InputField',
                },
                {
                    name: 'department',
                    type: 'text',
                    value: 'department',
                    label: 'department',
                    component: 'InputField',
                },
                {
                    name: 'office',
                    type: 'text',
                    value: 'office',
                    label: 'office',
                    component: 'InputField',
                },
                {
                    name: 'officePhone',
                    type: 'text',
                    value: 'officePhone',
                    label: 'officePhone',
                    component: 'InputField',
                },
                {
                    name: 'mobilePhone',
                    type: 'text',
                    value: 'mobilePhone',
                    label: 'mobilePhone',
                    component: 'InputField',
                },
                {
                    name: 'description',
                    type: 'text',
                    value: 'description',
                    label: 'description',
                    component: 'InputField',
                },
                {
                    name: 'address.number',
                    type: 'text',
                    value: 'address.number',
                    label: 'address.number',
                    component: 'InputField',
                },
                {
                    name: 'address.interior',
                    type: 'text',
                    value: 'address.interior',
                    label: 'address.interior',
                    component: 'InputField',
                },
                {
                    name: 'address.street',
                    type: 'text',
                    value: 'address.street',
                    label: 'address.street',
                    component: 'InputField',
                },
                {
                    name: 'address.category',
                    type: 'text',
                    value: 'address.category',
                    label: 'address.category',
                    component: 'InputField',
                },
                {
                    name: 'address.zip',
                    type: 'text',
                    value: 'address.zip',
                    label: 'address.zip',
                    component: 'InputField',
                },
                {
                    name: 'address.city',
                    type: 'text',
                    value: 'address.city',
                    label: 'address.city',
                    component: 'InputField',
                },
                {
                    name: 'address.state',
                    type: 'text',
                    value: 'address.state',
                    label: 'address.state',
                    component: 'InputField',
                },
                {
                    name: 'address.country',
                    type: 'text',
                    value: 'address.country',
                    label: 'address.country',
                    component: 'InputField',
                },
            ],
        }

    }
;

export default schema;
