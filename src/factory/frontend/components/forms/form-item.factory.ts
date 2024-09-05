import { Factory } from 'fishery';

export class FormItemFactory extends Factory<any> {
  inputField() {}

  select() {}

  listFieldFromStatePath() {}

  listFieldFromStateApi() {}
}

export const typeOrmKeyFactory = FormItemFactory.define(() => ({}));
