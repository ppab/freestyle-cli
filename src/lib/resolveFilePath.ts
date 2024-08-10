import path from "path";

export const resolveFilePath = (args: string[] | string): string => {
    const paths = [args].flat();  // Flatten the arguments into an array
    // console.log("paths", paths);
    const result = path.resolve(...paths);
    if (!result) {
        throw new Error(`path '${[...paths]}'was not resolved`)// Use the spread operator to pass the array elements as individual arguments
    }
    return result

};


