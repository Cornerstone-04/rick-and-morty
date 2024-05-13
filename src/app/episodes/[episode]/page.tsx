"use client"

const Episode = ({ params }: { params: { episode: string } }) => {

  

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      <header className="font-bold w-full flex items-center justify-between">
        <h1 className="flex flex-col gap-1">
          <span className="text-3xl">Episodes</span>
          <em className="text-xs text-gray-400">
            {/* Page {page}/{totalPages} */}
          </em>
        </h1>
        <div className="text-base flex gap-4">
          {/* <button
            disabled={page === 1}
            onClick={() => fetchCharacters(page - 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="" />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => fetchCharacters(page + 1)}
            className="disabled:opacity-50"
          >
            <NavArrow className="rotate-180" />
          </button> */}
        </div>
      </header>
      <section className="flex gap-8 flex-wrap">
        {/* {characters?.map(({ name, id, image }) => (
          <div
            key={id}
            className="w-[300px] h-[300px] character-image cursor-pointer hover:scale-[1.1] transition-all ease-linear relative"
          >
            <img src={image} alt={name} className="" />
            <div className="w-full h-full image-overlay">
              <Link href={`/characters/${id}`} className="image-name">
                {name}
              </Link>
            </div>
          </div>
        ))} */}
      </section>
    </div>
  );
};

export default Episode;
