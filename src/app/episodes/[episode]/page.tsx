const Episode = ({ params }: { params: { episode: string } }) => {
  return (
    <div>
      <h1>Episode {params.episode}</h1>
    </div>
  );
};

export default Episode;
