import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";

export function extendSchema(input: Schema, definition: SchemaDefinition, options?: SchemaOptions) {
    return new Schema(
        Object.assign({}, input.obj, definition),
        options,
    );
}

export const Utils = {
    extendSchema,
};