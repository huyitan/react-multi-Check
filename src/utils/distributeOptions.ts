const distributeOptions = <T>(options: T[], columns: number) => {
  const layout: T[][] = [];

  const totalOptions = options.length;
  const baseColumnSize = Math.floor(totalOptions / columns);
  const extraItems = totalOptions % columns;

  let currentIndex = 0;

  for (let i = 0; i < columns; i++) {
    // Add one extra item to each first columns
    const columnSize = baseColumnSize + (i < extraItems ? 1 : 0);
    layout.push(options.slice(currentIndex, currentIndex + columnSize));

    currentIndex += columnSize;
  }

  return layout;
};

export default distributeOptions;
