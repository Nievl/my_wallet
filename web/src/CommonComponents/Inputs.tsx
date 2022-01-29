import { FormGroup, Label, Input } from 'reactstrap';

export const NameInput = () => (
  <FormGroup>
    <Label for="name">Имя</Label>
    <Input id="name" name="name" placeholder="Название" type="text" required />
  </FormGroup>
);

export const AmountInput = ({
  name = 'amount',
  title = 'Сумма',
  isNull = false,
}: {
  title?: string;
  name?: string;
  isNull?: boolean;
}) => (
  <FormGroup>
    <Label for={name}>{title}</Label>
    <Input id={name} name={name} placeholder="Колличество" type="number" required={!isNull} />
  </FormGroup>
);

export const DescInput = () => (
  <FormGroup>
    <Label for="description">Описание</Label>
    <Input id="description" name="description" placeholder="Описание" type="textarea" />
  </FormGroup>
);

export const DateInput = ({
  name = 'date',
  title = 'Дата',
  isNull = false,
}: {
  title?: string;
  name?: string;
  isNull?: boolean;
}) => (
  <FormGroup>
    <Label for="dateCreate">{title}</Label>
    <Input id="dateCreate" name={name} type="date" required={!isNull} />
  </FormGroup>
);

export const TextInput = ({ name, title, isNull = false }: { title: string; name: string; isNull?: boolean }) => (
  <FormGroup>
    <Label for={name}>{title}</Label>
    <Input id={name} name={name} type="text" required={!isNull} />
  </FormGroup>
);
