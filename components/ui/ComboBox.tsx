import Autocomplete from "@mui/material/Autocomplete";
import { Store } from "@prisma/client";

interface Item {
  label: string;
  value: string;
}

type ItemArray = Item[];
interface AutoCompleteProps {
  items: ItemArray;
  renderInput: (params: object) => React.ReactNode;
  id: string;
  className: string;
  style: object;
  onChange: (event: React.MouseEvent, val: any) => void;
}

const ComboBox: React.FC<AutoCompleteProps> = ({
  items,
  renderInput,
  id,
  className,
  style,
  onChange,
}) => {
  return (
    <Autocomplete
      id={id}
      options={items}
      renderInput={renderInput}
      className={className}
      sx={style}
      onChange={onChange}
    />
  );
};

export default ComboBox;
