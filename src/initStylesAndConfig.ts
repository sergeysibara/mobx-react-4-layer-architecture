import { configure } from "mobx";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default () => {
  // don't allow state modifications outside actions
  configure({ enforceActions: "always" });
};

