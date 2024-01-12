import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";

// Configurar el entorno de prueba para manejar eventos del DOM
configure({ testIdAttribute: "data-test-id" });
