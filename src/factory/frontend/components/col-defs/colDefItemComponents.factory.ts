const deleteButton = (
  args: { [key: string]: any } = {
    url: 'urls.mutateUrl',
    action: 'actions.deleteAction',
  },
  headerName?: string,
) => ({
  headerName: `${headerName ?? 'Options'}`,
  cellRenderer: ['DeleteButton', { ...args }],
});

const linkButton = (
  args: { [key: string]: any } = {},
  headerName?: string,
) => ({
  headerName: `${headerName ?? 'Id'}`,
  cellRenderer: ['LinkButton', { ...args }],
});

export const colDefItemComponentsFactory = (
  name: string, //'DeleteButton' | 'LinkButton',
  args?: { [key: string]: any },
  headerName?: string,
) => {
  switch (name) {
    case 'DeleteButton':
      return deleteButton(args, headerName);
    case 'LinkButton':
      return linkButton(args, headerName);
  }
  return {
    name,
  };
};
