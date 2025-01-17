import { Form } from "react-bootstrap";
import { SecType } from "./types.d";

interface Props {
  type: SecType;
  loading: boolean;
  onChange: (value: string) => void;
  value: string;
}

const comunEstilo = {
  border: 0,
  height: "200px",

};

const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SecType;
  loading?: boolean;
}) => {
  if (type === SecType.From) return "Introducir Texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};


export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles =
    type === SecType.From
    ? comunEstilo
    : { ...comunEstilo, backgroundColor: "#f5f5f5" };
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        onChange(e.target.value)
    }
    return (
        <Form.Control
        autoFocus={type === SecType.From}
        as="textarea"
        placeholder={getPlaceHolder({ type, loading })}
        style={styles}
        value={value}
        onChange={handleChange}
        />
    );
};
