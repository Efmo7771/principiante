import "./bootstrap.min.css";
import "./App.css";
import { useStore } from "./hook/useStore";
import { Button, Container, Row, Col,  Stack } from "react-bootstrap";
import { ArrowIcons } from "./assets/robo";
import { LaguageSelector } from "./LanguageSelector";
import { SecType } from "./types.d";
import { TextArea } from "./TextArea";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    loading,
    intercambiaIdioma,
    configuraIdiomaEntrada,
    configuraIdiomaSalida,
    configuraTextoEntrada,
    configuraTextoSalida,
  } = useStore();
  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LaguageSelector
              type={SecType.From}
              value={fromLanguage}
              onChange={configuraIdiomaEntrada}
            />
            <TextArea
              type={SecType.From}
              value={fromText}
              onChange={configuraTextoEntrada}
              loading={false}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button variant="link" onClick={intercambiaIdioma}>
            <ArrowIcons />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LaguageSelector
              type={SecType.To}
              value={toLanguage}
              onChange={configuraIdiomaSalida}
            />
            <TextArea
            type={SecType.To}

              loading={loading}
              value={toText}
              onChange={configuraTextoSalida}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
