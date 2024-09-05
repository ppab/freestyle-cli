type ColDefItemArgs = {
  field: string;
  editable: boolean;
};
export const colDefFieldFactory = ({ field, editable }: ColDefItemArgs) => {
  let editObject = {};
  if (editable) {
    editObject = {
      valueSetter: [
        'reduxValueSetter2',
        {
          url: 'urls.mutateUrl',
          actionDispatcher: 'actions.updateAction',
          queryParam: 'urls.mutateQueryParam',
        },
      ],
    };
  }
  return {
    field,
    ...editObject,
    editable,
  };
};
