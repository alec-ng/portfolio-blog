import uuidv1 from "uuid/v1";
import { ACTION_TYPES } from "./index";

export default function blockReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_BLOCK:
      let blocks = [...state];
      let newBlock = {
        name: action.payload.pluginName,
        baseAttrs: {},
        variation: "stretch", // TODO: add logic for default variation here
        variationAttrs: {},
        uuid: uuidv1()
      };
      if (!action.payload.uuid) {
        blocks.push(newBlock);
      } else {
        let i = 0;
        for (; i < blocks.length; i++) {
          if (blocks[i].uuid === action.payload.uuid) {
            break;
          }
        }
        blocks.splice(i, 0, newBlock);
      }
      return blocks;
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}
