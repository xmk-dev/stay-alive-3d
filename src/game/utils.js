export const distortVertex = (vertex, value = 0) => {
  const height = Math.random() * value;
  const offset = vertex.clone().normalize().multiplyScalar(height);
  vertex.add(offset);
};
