const getId = (requests) => {
  if (requests.length === 0) {
    return 1;
  }
  const maxId = Math.max(...requests.map(({id}) => id));
  return (maxId + 1);
};

export default getId;
