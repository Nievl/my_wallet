import { observer } from 'mobx-react-lite';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IOptions } from '../controllers/options';
import { viewState } from '../states/view';

interface Props {}

type form = {
  name: { value: string };
  description: { value: string };
  type: { value: IOptions };
} & HTMLFormElement;

export const AddOption = observer(({}: Props) => {
  if (!viewState.addOption) {
    return null;
  }
  const _addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as form).name.value;
    const description = (e.target as form).description.value;
    const type = (e.target as form).type.value;
    if (type === 'category') {
      // categorysState.addOne(name, description);
    }
    if (type === 'currency') {
      // currenciesState.addOne(name, description);
    }
  };
  const close = () => viewState.showAddOption(false);
  return (
    <Modal toggle={close} isOpen={viewState.addOption}>
      <Form onSubmit={_addCategory}>
        <ModalHeader toggle={close}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="type">Тип</Label>
            <select id="type" name="type" required>
              <option value="category">category</option>
              <option value="currency">currency</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="name">Имя</Label>
            <Input id="name" name="name" placeholder="with a placeholder" type="text" required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Описание</Label>
            <Input id="description" name="description" placeholder="password placeholder" type="text" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Add
          </Button>
          <Button onClick={close}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
});
