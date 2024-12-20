import distributeOptions from "./distributeOptions";

describe("distributeOptions", () => {
  it("should distribute options evenly", () => {
    const options = ["aaa", "bbb", "ccc", "ddd", "eee", "fff"];
    const columns = 3;
    const result = distributeOptions(options, columns);

    expect(result).toEqual([
      ["aaa", "bbb"],
      ["ccc", "ddd"],
      ["eee", "fff"],
    ]);
  });

  it("should handle cases where options cannot be evenly distributed", () => {
    const options = ["aaa", "bbb", "ccc", "ddd", "eee"];
    const columns = 3;
    const result = distributeOptions(options, columns);

    expect(result).toEqual([["aaa", "bbb"], ["ccc", "ddd"], ["eee"]]);
  });

  it("should return empty columns if options array is empty", () => {
    const options: string[] = [];
    const columns = 3;
    const result = distributeOptions(options, columns);

    expect(result).toEqual([[], [], []]);
  });

  it("should handle single option each column correctly", () => {
    const options = ["aaa", "bbb", "ccc"];
    const columns = 1;
    const result = distributeOptions(options, columns);

    expect(result).toEqual([["aaa", "bbb", "ccc"]]);
  });

  it("should handle more columns than options", () => {
    const options = ["aaa", "bbb"];
    const columns = 5;
    const result = distributeOptions(options, columns);

    expect(result).toEqual([["aaa"], ["bbb"], [], [], []]);
  });
});
