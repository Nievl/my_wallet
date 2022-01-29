import { observer } from 'mobx-react-lite';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { inOutComeRequest } from '../../dto/Transaction';
import { CategorysState } from '../states/category.state';
import { CurrenciesState } from '../states/currency.state';
import { TransactionState } from '../states/transaction.state';

import { viewState } from '../states/view';

interface Props {}

type form = { [key in keyof inOutComeRequest]: { value: string } } & HTMLFormElement;

export const AddTransaction = observer(({}: Props) => {
  if (!viewState.addTransaction) {
    return null;
  }
  const _addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const requestObj: inOutComeRequest = {
      category: (e.target as form).category.value,
      amount: parseFloat((e.target as form).amount.value),
      currency: (e.target as form).currency.value,
      date: new Date((e.target as form).dateCreate.value).getTime(),
      description: (e.target as form).description.value,
      DO_TYPE: '1',
    };
    TransactionState.addOne(requestObj);
  };
  const close = () => viewState.showAddTransaction(false);
  return (
    <Modal toggle={close} isOpen={viewState.addTransaction}>
      <Form onSubmit={_addTransaction}>
        <ModalHeader toggle={close}>Add Transaction</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="category">Категория</Label>
            <Input id="category" name="category" placeholder="with a placeholder" type="select" required>
              {CategorysState.list.map((c) => (
                <option key={c.uid} value={c.uid}>
                  {c.NAME}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Сумма</Label>
            <Input id="amount" name="amount" placeholder="with a placeholder" type="number" required />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Валюта</Label>
            <Input id="currency" name="currency" placeholder="with a placeholder" type="select" required>
              {CurrenciesState.list.map((c) => (
                <option key={c.uid} value={c.uid}>
                  {c.NAME}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="converted_amount">Конвертированная сумма</Label>
            <Input
              id="converted_amount"
              name="converted_amount"
              placeholder="with a placeholder"
              type="number"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateCreate">Дата создания</Label>
            <Input id="dateCreate" name="dateCreate" placeholder="with a placeholder" type="date" required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Описание</Label>
            <Input id="description" name="description" placeholder="password placeholder" type="textarea" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">
            Add
          </Button>
          <Button onClick={close} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
});
