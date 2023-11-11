import {DataGenerator} from "./DataGenerator";
import {CubeJS, TDefinition} from "./CubeJS";


export function cubeJSTest() {
  const dataset = DataGenerator("vendas");
  const definition:TDefinition = {
    cols: ["loja", "tipo"],
    rows: ["ano", "mes"],
    measures: ["media1", "media2"],
  }
  const cube = new CubeJS(definition);
  cube.setDataset(dataset);
}