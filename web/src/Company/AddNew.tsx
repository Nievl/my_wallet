import { observer } from 'mobx-react-lite';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CompanyRequest } from '../../dto/Company';
import { CompanyState } from '../states/company.state';

import { viewState } from '../states/view';
import { Iform } from '../../dto/index';
import { DateInput, DescInput, NameInput, TextInput } from '../CommonComponents/Inputs';

type form = Iform<CompanyRequest>;

export const AddCompany = observer(() => {
  const isOpen = viewState.addCompany;
  if (!isOpen) {
    return null;
  }
  const _add = (e: React.FormEvent) => {
    e.preventDefault();
    const requestObj: CompanyRequest = {
      name: (e.target as form).name.value,
      position: (e.target as form).position.value,
      dateStart: new Date((e.target as form).dateStart.value).getTime(),
      dateEnd: new Date((e.target as form).dateEnd.value).getTime(),
      description: (e.target as form).description.value,
    };
    CompanyState.addOne(requestObj);
  };
  const close = () => viewState.showAddCompany(false);
  return (
    <Modal toggle={close} isOpen={isOpen}>
      <Form onSubmit={_add}>
        <ModalHeader toggle={close}>Add Company</ModalHeader>
        <ModalBody>
          <NameInput />
          <TextInput name="position" title="Должность" />
          <DateInput name="dateStart" title="Дата начала" />
          <DateInput name="dateEnd" title="Дата окончания" isNull />
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
