const colors = {
  grade1: "#fdfdff",
  grade2: "#f4f3f8",
  grade3: "#e2e1ea",
  grade4: "#d0cde0",
  grade5: "#b9b5ce",
  grade6: "#87839a",
  grade7: "#6c6883",
  grade8: "#413e53",
  grade9: "#282732",
  grade10: "#1e1d25",
  active: "#5844d7",
};

const hexOpacity = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export { hexOpacity };
export default colors;
