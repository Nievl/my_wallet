import { observer } from 'mobx-react-lite';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import { errorsState } from '../states/errors';

export const ErrorsFeed = observer(() => {
  return (
    <div>
      {errorsState.errors.map((err) => {
        return (
          <Toast>
            <ToastHeader toggle={() => errorsState.remove(err.id)} icon="danger">
              Error
            </ToastHeader>
            <ToastBody>{err.message}</ToastBody>
          </Toast>
        );
      })}
    </div>
  );
});
