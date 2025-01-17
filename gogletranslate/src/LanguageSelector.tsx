import { Form } from "react-bootstrap";
import { LENGUAJE_AUTO, LENGUAJES_SOPORTADOS } from "./constantes";
import { FromLanguage, Language, SecType } from "./types.d";

type Props =
  | {
      type: SecType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: SecType.To; value: Language; onChange: (language: Language) => void };

export const LaguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select
      aria-label="Selecciona el Idioma"
      onChange={handleChange}
      value={value}
    >
      {type === SecType.From && (
        <option value={LENGUAJE_AUTO}>Detectar Idioma</option>
      )}
      {Object.entries(LENGUAJES_SOPORTADOS).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
