import { observer } from 'mobx-react-lite';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AmountInput, DescInput } from '../CommonComponents/Inputs';
import { SalaryState } from '../states/Salary.state';
import { CompanyState } from '../states/company.state';
import { viewState } from '../states/view';

import { SalaryRequest } from '../../dto/Salary';
import { Iform } from '../../dto/index';

type form = Iform<SalaryRequest>;

export const AddSalary = observer(() => {
  const isOpen = viewState.addSalary;
  if (!isOpen) {
    return null;
  }
  const _add = (e: React.FormEvent) => {
    e.preventDefault();
    const requestObj: SalaryRequest = {
      company: parseFloat((e.target as form).company.value),
      gross: parseFloat((e.target as form).gross.value),
      net: parseFloat((e.target as form).net.value),
      hided: parseFloat((e.target as form).hided.value),
      description: (e.target as form).description.value,
    };
    SalaryState.addOne(requestObj);
  };
  const close = () => viewState.showAddSalary(false);
  return (
    <Modal toggle={close} isOpen={isOpen}>
      <Form onSubmit={_add}>
        <ModalHeader toggle={close}>Add Salary</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="company">Компания</Label>
            <Input id="company" name="company" type="select" required>
              {CompanyState.list.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <AmountInput name="gross" title="Gross" />
          <AmountInput name="net" title="Ned" />
          <AmountInput name="hided" title="В черную" />
          <DescInput />
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
